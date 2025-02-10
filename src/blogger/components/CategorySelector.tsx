import React, { useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategorySelectorProps {
  setCategory: (category: string) => void;
}

const DUMMY_CATEGORIES: Category[] = [
  { id: '1', name: 'Technology' },
  { id: '2', name: 'Business' },
  { id: '3', name: 'Health' },
  { id: '4', name: 'Lifestyle' },
  { id: '5', name: 'Entertainment' },
];

const CategorySelector: React.FC<CategorySelectorProps> = ({ setCategory }) => {
  const [categories] = useState<Category[]>(DUMMY_CATEGORIES);
  const [loading] = useState<boolean>(false); // Simulated loading state
  const [error] = useState<string | null>(null); // Simulated error state

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  return (
    <div className="post-category">
      <select onChange={handleChange} defaultValue="" disabled={loading || error !== null} className="post-category-select">
        {loading ? (
          <option value="" disabled>Loading categories...</option>
        ) : error ? (
          <option value="" disabled>{error}</option>
        ) : (
          <>
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
};

export default CategorySelector;
