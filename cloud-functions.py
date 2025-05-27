from decimal import Decimal

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


class Product(BaseModel):
    id: int


@app.get("/products", response_model=list[Product])
async def get_products(
        color: str = None, min_price: Decimal = None, max_price: Decimal = None, size: str = None, limit: int = 10):
    if min_price is not None and max_price is not None:
        price_def = f"price BETWEEN {min_price} AND {max_price}"
    elif min_price is not None:
        price_def = f"price >= {min_price}"
    elif max_price is not None:
        price_def = f"price <= {max_price}"
    else:
        price_def = ""

    if size:
        size_join = f"""
        JOIN product_sku sku
          ON products.id = sku.product_id
        JOIN product_sizes ps
          ON sku.product_size_id = ps.id
         AND ps.value = '{size}'
        """
    else:
        size_join = ""

    if color:
        color_cond = f"MATCH(products.description) AGAINST ('{color}')"
    else:
        color_cond = "1"

    def blocking_query():
        sql = f"""
          SELECT products.id FROM products
          {size_join}
          WHERE
            {color_cond}
            {f"AND {price_def}" if price_def else ""}
          GROUP BY products.id
          ORDER BY products.id
          LIMIT {limit}
        """
        result = execute_query(sql)
        rows = result.fetchall()
        return [{"id": row[0]} for row in rows]

    try:
        return await run_in_thread(blocking_query)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching products: {str(e)}")


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
