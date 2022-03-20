import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Parking } from 'models/parking';
import { Box } from '@mui/system';
import CarouselParking from 'pages/DashboardAdmin/Carousel/Carousel';
import { useDispatch } from 'react-redux';
import {
  updateParkingConfirm,
  updateParkingReject,
} from 'components/ParkingProvider/parkingProvider.action';

interface ICardParkingProcess {
  parking: Parking;
}
export default function CardParkingProcess({
  parking,
}: ICardParkingProcess): JSX.Element {
  const dispatch = useDispatch();
  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardActionArea>
        <CarouselParking images={parking.images} />
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
          <Button
            size="large"
            variant="contained"
            onClick={(): void => {
              dispatch(updateParkingConfirm(parking.id));
            }}
          >
            Confirm
          </Button>
          {parking.status !== 'reject' && (
            <Button
              size="large"
              variant="contained"
              color="error"
              onClick={(): void => {
                dispatch(updateParkingReject(parking.id));
              }}
            >
              Reject
            </Button>
          )}
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
