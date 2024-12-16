import { ProductImage } from '../model/product_image.model';

export class ImageBuilder {
  private image: Express.Multer.File | null = null;
  private productId: string = '';
  private name: string = '';
  private imageModel: typeof ProductImage = ProductImage;
  public setImage(image: Express.Multer.File | null) {
    if (image) {
      this.image = image;
    }
    return this;
  }

  public setProductId(id: string) {
    this.productId = id;
    return this;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public async excuteSaveImage() {
    return await this.imageModel.create({
      name: this.name,
      image: this.image!.destination,
      productId: this.productId,
    });
  }
}
