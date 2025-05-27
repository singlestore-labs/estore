app = FastAPI()


@app.get("/tables/{table_name}/count", response_model=int)
async def get_table_count(table_name: str):
    def blocking_query():
        sql = f"SELECT COUNT(*) AS count FROM {table_name};"
        result = execute_query(sql)
        row = result.fetchone()
        return row[0]

    try:
        return await run_in_thread(blocking_query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching table count: {str(e)}")


class TopProduct(BaseModel):
    id: int
    score: int


@app.get("/products/top", response_model=list[TopProduct])
async def get_top_products(limit: int = 10):
    def blocking_query():
        sql = f"""
          SELECT products.id, orders.count + likes.count AS score
          FROM products products
          JOIN (
            SELECT sku.product_id, sku.stock, COUNT(*) AS count
            FROM orders orders
            JOIN product_sku sku ON orders.product_sku_id = sku.id
            GROUP BY sku.product_id
          ) orders ON products.id = orders.product_id
          JOIN (
            SELECT product_id, COUNT(*) AS count
            FROM product_likes
            GROUP BY product_id
          ) likes ON products.id = likes.product_id
          ORDER BY score DESC, products.title ASC
          LIMIT {limit}
        """
        result = execute_query(sql)
        rows = result.fetchall()
        return [{"id": row[0], "score": row[1]} for row in rows]

    try:
        return await run_in_thread(blocking_query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching top products: {str(e)}")


class ProductSales(BaseModel):
    value: int
    date: date


@app.get("/products/{id}/sales", response_model=list[ProductSales])
async def get_product_sales(id: str, interval: int = 6, interval_unit: str = 'MONTH'):
    def blocking_query():
        sql = f"""
            SELECT COUNT(*) AS value, DATE(orders.created_at) AS date
            FROM orders orders
            JOIN product_sku sku ON orders.product_sku_id = sku.id
            JOIN products products ON sku.product_id = products.id
            WHERE products.id = {id}
            AND orders.created_at >= (SELECT CURDATE() - INTERVAL {interval} {interval_unit})
            GROUP BY DATE(orders.created_at)
            ORDER BY DATE(orders.created_at)
        """
        result = execute_query(sql)
        rows = result.fetchall()
        return [{"value": row[0], "date": row[1]} for row in rows]

    try:
        return await run_in_thread(blocking_query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching products sales: {str(e)}")
