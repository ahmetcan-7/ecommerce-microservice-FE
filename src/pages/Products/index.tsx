import React, { useCallback, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { ProductApi } from "../../api/productApi";
import { PRODUCT_PARAM } from "../../constants/product";
import Card from "../../components/Card";
import { Grid } from "@material-ui/core";
import SearchBar from "../../components/SearchBar";
import { CategoryApi } from "../../api/categoryApi";
import { Category } from "../../types/category";
import ProductViewPlaceholder from "../../components/ProductViewPlaceholder";
import { useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";

function Products() {
  const navigate = useNavigate();
  const { ref, inView } = useInView();
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("DATE_DESC");
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery(
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

  const delayedSearchTerm = useCallback(
    debounce((q) => setSearchTerm(q), 500),
    []
  );

  const handleChangeSearchValue = (value: string) => {
    setSearchValue(value);
    delayedSearchTerm(value);
  };

  const getAllCategories = async () => {
    const categories = await CategoryApi.getCategories();
    setCategories(categories);
  };

  return (
    <>
      <SearchBar
        onChangeSearchValue={handleChangeSearchValue}
        searchValue={searchValue}
        filter={filter}
        onChangeFilter={setFilter}
        sortBy={sortBy}
        onChangeSortBy={setSortBy}
        categories={categories}
      />
      {data?.pages.map((page, k) => (
        <React.Fragment key={k}>
          <Grid container spacing={2} xs={12}>
            {page.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  key={product.id}
                  product={product}
                  onClick={() => navigate(`products/${product.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}
      {isFetching && <ProductViewPlaceholder />}
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
    </>
  );
}

export default Products;
