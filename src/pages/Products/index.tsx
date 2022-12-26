import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { ProductApi } from "../../api/productApi";
import { PRODUCT_PARAM } from "../../constants/product";
import Card from "../../components/Card";
import { Grid } from "@material-ui/core";
function Products() {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["projects"],
    ({ pageParam = 0 }) =>
      ProductApi.getProducts({ ...PRODUCT_PARAM, page: pageParam }),
    {
      getNextPageParam: (lastGroup, allGroups) => {
        const morePageExist = lastGroup?.length === PRODUCT_PARAM.size;

        if (!morePageExist) return;

        return allGroups?.length;
      },
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <h1>Products</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: Something went wrong!!</span>
      ) : (
        <>
          {/* <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? "Loading more..."
                : hasPreviousPage
                ? "Load Older"
                : "Nothing more to load"}
            </button>
          </div> */}
          {data?.pages.map((page, k) => (
            <React.Fragment key={k}>
              <Grid container spacing={2} xs={12}>
                {page.map((product) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card key={product.id} product={product} />
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          ))}
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load Newer"
                : "Nothing more to load"}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? "Background Updating..."
              : null}
          </div>
        </>
      )}
    </div>
  );
}

export default Products;
