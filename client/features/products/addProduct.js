import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProductAsync } from './productSlice';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createProductAsync({ name, description, price, image, category }));
    setDescription('');
    setName('');
    setPrice('');
    setImage('');
    setCategory('');
  };

  return (
    <div>
      <h2>Add a Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Product Name:</label>
        <input
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <input
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <label htmlFor="price">Price:</label>
        <input
          name="price"
          type="number"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <label htmlFor="image">Image Url:</label>
        <input
          name="image"
          value={image}
          onChange={(event) => setImage(event.target.value)}
        />

        <label htmlFor="category">Category:</label>
        <input
          name="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />

        <button
          type="submit"
          disabled={name && description && price ? false : true}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
