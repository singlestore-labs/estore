## Getting started

**Note:** The following steps are only necessary if the `./export` folder does not contain any of the following dataset files:

- `products-*.json`
- `product_types.json`

Try cloning the source repo again or follow the steps below:

1. Download the [Farfetch Listings](https://www.kaggle.com/datasets/alvations/farfetch-listings?resource=download) dataset
2. Unzip the dataset to the `./source` folder
3. Normalize the dataset by running: `npm run normalize`
4. Generate the data by running: `npm run generate`
   - **Note:** Creating product image descriptors can cost up to **$70** using OpenAI Vision API.
5. Insert the data into a database by running `npm run start`
