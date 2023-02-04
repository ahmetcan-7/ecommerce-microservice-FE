import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { ProductApi } from "../../api/productApi";
import { PRODUCT_PARAM } from "../../constants/product";
import Card from "../../components/Card";
import { Grid, Typography } from "@material-ui/core";
import SearchBar from "../../components/SearchBar";
import { CategoryApi } from "../../api/categoryApi";
import { Category } from "../../types/category";

function Products() {
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("DATE_DESC");
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const searchTerm = searchValue.length >= 3 ? searchValue : "";

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["projects", searchTerm, sortBy, filter],
    ({ pageParam = 0 }) =>
      ProductApi.getProducts({
        ...PRODUCT_PARAM,
        page: pageParam,
        searchTerm: searchTerm,
        sort: sortBy,
        filter: filter,
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

  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    const categories = await CategoryApi.getCategories();
    setCategories(categories);
  };

  return (
    <div>
      <SearchBar
        onChangeSearchValue={setSearchValue}
        searchValue={searchValue}
        filter={filter}
        onChangeFilter={setFilter}
        sortBy={sortBy}
        onChangeSortBy={setSortBy}
        categories={categories}
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
