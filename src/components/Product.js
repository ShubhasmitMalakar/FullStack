import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';

export default function Product(props) {
    const newData = props.items
    return (
        <>
        <Container maxWidth="lg">
            <Grid container direction="row" justifyContent="space-around" spacing={2}>
            {
                newData.length !=0 ? newData.products.map((item, i) => (
                    <Grid item key={i}  xs={12} md={6} lg={4} xl={4}>
                        <div>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.images[0]}
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.brand} {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.description}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                                </Card>
                            <br />
                        </div>
                    </Grid>
                )) : null
            }

            </Grid>
        </Container>
            
        </>
    )
}