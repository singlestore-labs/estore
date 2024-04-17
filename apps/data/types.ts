export type SourceDatasetRecord = {
  "availableSizes": string;
  "brand.id": string;
  "brand.name": string;
  "gender": string;
  "hasSimilarProducts": string;
  "id": string;
  "images.cutOut": string;
  "images.model": string;
  "isCustomizable": string;
  "merchandiseLabel": string;
  "merchandiseLabelField": string;
  "merchantId": string;
  "priceInfo.currencyCode": string;
  "priceInfo.discountLabel": string;
  "priceInfo.finalPrice": string;
  "priceInfo.formattedFinalPrice": string;
  "priceInfo.formattedInitialPrice": string;
  "priceInfo.initialPrice": string;
  "priceInfo.installmentsLabel": string;
  "priceInfo.isOnSale": string;
  "shortDescription": string;
  "stockTotal": string;
};

export type NormalizedDatasetRecord = {
  id: string;
  description: string;
  image: string;
  price: number;
  sizesInStock: Record<string, number>;
  gender: string;
};
