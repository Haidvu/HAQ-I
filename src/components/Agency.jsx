import React, { useEffect } from 'react';
// import { Typography, AppBar, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, Toolbar, Container } from '@material-ui/core';

const Agency = () => {
  useEffect(() => {
    window.location.href = "https://www.tceq.texas.gov/permitting/reporting.html";
  }, []);

  return (
    <div>
      <h2>Agency</h2>
    </div>
  );
}
export default Agency;