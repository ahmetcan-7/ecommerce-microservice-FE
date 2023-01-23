import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { ProductApi } from "../../api/productApi";
import { PRODUCT_PARAM } from "../../constants/product";
import Card from "../../components/Card";
import { Grid, Typography } from "@material-ui/core";
import SearchBar from "../../components/SearchBar";

function Products() {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");

  const searchTerm = searchValue.length >= 3 ? searchValue : "";
  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["projects", searchTerm],
    ({ pageParam = 0 }) =>
      ProductApi.getProducts({
        ...PRODUCT_PARAM,
        page: pageParam,
        searchTerm: searchTerm,
      }),
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
      <Typography variant="h2" align="center">
        Products
      </Typography>
      <SearchBar
        onChangeSearchValue={setSearchValue}
        searchValue={searchValue}
      />
      {status === "loading" ? (
        <p>Loading...</p>
      ) : status === "error" ? (
        <span>Error: Something went wrong!!</span>
      ) : (
        <>
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
