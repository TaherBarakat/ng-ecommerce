export interface IPostCartReqBody {
  data: {
    Email: string;
    Username: string;
    products: {
      connect: string[];
    };
  };
}
