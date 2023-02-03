import { Box, IconButton, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CategoryApi } from "../../../api/categoryApi";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { showSuccess } from "../../../utils/showSuccess";

function Categories() {
  const queryClient = useQueryClient();
  const [categoryName, setCategoryName] = useState("");

  const { data: categories } = useQuery(["admin-category:categories"], () =>
    CategoryApi.getCategories()
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const addCategory = () => {
    createMutation.mutate({ name: categoryName });
  };

  const createMutation = useMutation(CategoryApi.saveCategory, {
    onSuccess: () => {
      setCategoryName("");
      showSuccess("Category has been created successfully");
      queryClient.invalidateQueries("admin-category:categories");
    },
  });

  return (
    <div
      style={{
        width: "20%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" style={{ margin: "0.5rem 0" }}>
        Categories
      </Typography>
      <TextField
        id="standard-name"
        label="Category Name"
        value={categoryName}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <IconButton onClick={addCategory}>
              <AddCircleIcon />
            </IconButton>
          ),
        }}
      />
      {categories?.map((category) => (
        <Box
          sx={{
            boxShadow: 3,
            height: "2.5rem",
            bgcolor: "lightGrey",
            color: "white",
            p: 1,
            m: 1,
            borderRadius: 2,
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: "700",
            marginTop: "0.5rem",
            width: "100%",
          }}
          key={category.id}
        >
          {category.name}
        </Box>
      ))}
    </div>
  );
}

export default Categories;
