import { QueryTypes } from 'sequelize';
import { Products } from '../model/products.model';
import {
  EOPERATION,
  ESORTEDVALUE,
  IFiltered,
  ISorted,
} from '../type/index.type';
import { Database } from '../config/db.config';

export class ProductBuilder {
  private id: string = '';
  private name: string = '';
  private price: number = 0;
  private like: number = 0;
  private sale: number = 0;
  private price_sale: number = 0;
  private type_id: string = '';
  private count: number = 0;
  private purchase_count: number = 0;
  private create_date: string = '';
  private update_date?: string;
  private create_user: string = '';
  public setProductId(id: string) {
    this.id = id;
    return this;
  }
  public setProductName(name: string) {
    this.name = name;
    return this;
  }

  public setPrice(price: number) {
    this.price = price;
    return this;
  }
  public setLike(like: number) {
    this.like = like;
    return this;
  }
  public setSale(sale: number) {
    this.sale = sale;
    return this;
  }
  public setPriceSale(price_sale: number) {
    this.price_sale = price_sale;
    return this;
  }
  public setTypeId(type_id: string) {
    this.type_id = type_id;
    return this;
  }
  public setCount(count: number) {
    this.count = count;
    return this;
  }
  public setPurchaseCount(purchase_count: number) {
    this.purchase_count = purchase_count;
    return this;
  }
  public setUpdateDate(update_date: string) {
    this.update_date = update_date;
    return this;
  }
  public setCreateUser(create_user: string) {
    this.create_user = create_user;
    return this;
  }

  public async excuteCreateProduct() {
    return await Products.create({
      count: this.count,
      createDate: this.create_date,
      createUser: this.create_user,
      id: this.id,
      like: this.like,
      name: this.name,
      price: this.price,
      purchaseCount: this.purchase_count,
      typeId: this.type_id,
      priceSale: this.price_sale,
      sale: this.sale,
    });
  }

  public async excuteUpdateProduct() {
    return await Products.update(
      {
        count: this.count,
        like: this.like,
        name: this.name,
        price: this.price,
        priceSale: this.price_sale,
        purchaseCount: this.purchase_count,
        sale: this.sale,
        updateDate: this.update_date,
      },
      { where: { id: this.id } }
    );
  }
  public async excuteFindOneProduct() {
    return await Products.findOne({ where: { id: this.id } });
  }

  public async excuteFindAll() {
    return await Products.findAll();
  }
}

export class SearchProductBuilder {
  private page: number = 1;
  private pageSize: number = 10;
  private filtered: IFiltered[] = [];
  private sorted: ISorted[] = [];
  private dbInstance: Database;

  constructor() {
    this.dbInstance = Database.getInstance();
  }

  public setPage(page: number) {
    this.page = page;
    return this;
  }

  setPageSize(pageSize: number) {
    this.pageSize = pageSize;
    return this;
  }

  public setFiltered(filtered: IFiltered[]) {
    this.filtered = filtered;
    return this;
  }

  public setSorted(sorted: ISorted[]) {
    this.sorted = sorted;
    return this;
  }

  public async excuteSearchProduct() {
    let index = 0;
    let sql = 'SELECT * FROM shopping.products as p WHERE true';
    const result: any[] = [];
    const resultCount: any[] = [];
    let indexCount = 0;
    this.filtered.forEach((item) => {
      switch (item.operation) {
        case EOPERATION.IN:
          result.push(item.value);
          sql += ` AND p.${item.id} IN ($${++index}) `;
          break;
        case EOPERATION.ABOUT:
          result.push(`%${item.value}%`); // Thêm ký tự `%` trực tiếp
          sql += ` AND p.${item.id} LIKE $${++index} `;
          break;
        case EOPERATION.BETWEEN:
          const value = (item.value as string)?.split(',');
          result.push(value[0]);
          result.push(value[1]);
          sql += ` AND p.${item.id} BETWEEN $${++index - 1} AND $${index} `;
          break;
        case EOPERATION.EQUALLY:
          result.push(item.value);
          sql += ` AND p.${item.id} = $${++index} `;
          break;
        case EOPERATION.NOT_EQUALLY:
          result.push(item.value);
          sql += ` AND p.${item.id} != $${++index} `;
          break;
        case EOPERATION.IS_NULL:
          sql += ` AND p.${item.id} IS NULL `;
          break;
        case EOPERATION.NOT_NULL:
          sql += ` AND p.${item.id} IS NOT NULL `;
          break;
      }
    });
    let queryCount = `SELECT COUNT(*) AS total FROM (${sql}) AS s`;
    if (this.sorted.length) {
      queryCount += ' ORDER BY ';
      this.sorted.forEach((item) => {
        result.push(item.id);
        switch (item.value) {
          case ESORTEDVALUE.DESC:
            queryCount += `s.$${++index} DESC, `;
            break;
          case ESORTEDVALUE.ASC:
            queryCount += `s.$${++index} ASC, `;
            break;
        }
      });
    }
    const dataSearch = await this.dbInstance.db.sequelize?.query(sql, {
      bind: result,
      type: QueryTypes.SELECT,
    });
    const count = await this.dbInstance.db.sequelize?.query<{ total: number }>(
      queryCount,
      {
        bind: result,
        type: QueryTypes.SELECT,
      }
    );
    return { dataSearch, total: count?.[0].total };
  }
}
