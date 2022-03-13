import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, CardMedia } from '@mui/material';
import { Parking } from 'models/parking';
import { Box } from '@mui/system';

interface ICardParkingProcess {
  parking: Parking;
}
export default function CardParkingProcess({
  parking,
}: ICardParkingProcess): JSX.Element {
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://picsum.photos/200/300"
          alt="green iguana"
        />
        <CardContent>
          <Box>
            <Typography variant="h6" component="div">
              {parking.name}
            </Typography>
            <Typography>{parking.business.user.fullName}</Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {parking.address.length > 69
              ? parking.address.substring(0, 55) + '...'
              : parking.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {parking.openTime.substring(0, 5)} AM -{' '}
            {parking.closeTime.substring(0, 5)} PM
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button size="large" variant="contained">
            Confirm
          </Button>
          <Button size="large" variant="contained">
            Deny
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
