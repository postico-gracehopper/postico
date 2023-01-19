import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddToCartButton from '../addToCartButton/AddToCartButton';
import { Link } from 'react-router-dom';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  color: 'slate',
  fontFamily: '',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AddToCartModal({ product, quantity }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddToCartButton onClick={handleOpen} product={product} quantity={1} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={product.image} />
          <Typography
            sx={{ fontFamily: 'IBM Plex Sans', position: 'center' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {quantity} {product.name} Added To Cart!
            <Button onClick={handleClose}>Keep Shopping</Button>
            <Link to="/checkout">
              <Button>Go To Cart</Button>
            </Link>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
