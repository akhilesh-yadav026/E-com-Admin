import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      image1 && URL.revokeObjectURL(image1);
      image2 && URL.revokeObjectURL(image2);
      image3 && URL.revokeObjectURL(image3);
      image4 && URL.revokeObjectURL(image4);
    };
  }, [image1, image2, image3, image4]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestSeller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        // setCategory('Men');
        // setSubCategory('Topwear');
        // setBestSeller(false);
        // setSizes([]);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-6 p-4">
      {/* Image Upload */}
      <div className="w-full">
        <p className="mb-3 text-lg font-medium text-gray-700">Upload Images</p>
        <div className="flex flex-wrap gap-4">
          {[image1, image2, image3, image4].map((img, i) => (
            <label htmlFor={`image${i + 1}`} key={i} className="cursor-pointer">
              <img
                className="w-24 h-24 object-cover border rounded shadow-sm"
                src={!img ? assets.upload_area : URL.createObjectURL(img)}
                alt={`upload ${i + 1}`}
              />
              <input
                onChange={(e) =>
                  [setImage1, setImage2, setImage3, setImage4][i](e.target.files[0])
                }
                type="file"
                id={`image${i + 1}`}
                hidden
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 text-lg font-medium text-gray-700">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2 text-lg font-medium text-gray-700">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write content here"
        />
      </div>

      {/* Category & Price */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            type="number"
            min="1"
            className="w-full px-3 py-2 sm:w-[120px]"
            placeholder="25"
            required
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="w-full mt-4">
        <p className="mb-2 text-lg font-medium text-gray-700">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? 'bg-pink-100' : 'bg-slate-200'
                } px-4 py-2 rounded-full text-sm font-medium text-gray-800 cursor-pointer hover:bg-slate-300 transition`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={(e) => setBestSeller(e.target.checked)}
          checked={bestSeller}
          type="checkbox"
          id="bestseller"
        />
        <label htmlFor="bestseller">Add to Bestseller</label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`w-28 py-3 mt-4 ${loading ? 'bg-gray-400' : 'bg-black'} text-white`}
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
};

export default Add;
