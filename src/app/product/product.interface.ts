export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
  provider_metadata?: {
    public_id: string;
    resource_type: string;
  };
}

interface Image {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    large: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  } | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface RichTextElement {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

export interface Course {
  id: number;
  documentId: string;
  title: string;
  description: RichTextElement[];
  price: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  instantDelivery: boolean | null;
  whatsincluded: RichTextElement[];
  category: string | null;
  banner: Image | null;
  files: null; // Update this type if files have a structure
}
