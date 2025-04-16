import { Course } from '../product/product.interface';

export interface IPostCartReqBody {
  data: {
    Email: string;
    Username: string;
    products: {
      connect: string[];
    };
  };
}

export interface ICarts {
  Email: string;
  Username: string;
  createdAt: string;
  documentId: string;
  id: number;
  products: Course[];
  publishedAt: string;
  updatedAt: 'string';
}
