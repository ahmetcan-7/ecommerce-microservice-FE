import { Box, Grid } from "@material-ui/core";
import { Skeleton } from "@mui/material";

function ProductViewPlaceholder() {
  return (
    <Grid container spacing={2} xs={12}>
      {Array.from(new Array(8)).map((item, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Box sx={{ pt: 0.5 }}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <Skeleton width="35%" />
              <Skeleton width="25%" />
            </Box>
            <Skeleton width="100%" />
            <Skeleton width="100%" />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductViewPlaceholder;
