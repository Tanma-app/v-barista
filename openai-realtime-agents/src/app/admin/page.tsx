"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface MenuItem {
  id?: string;
  name: string;
  description: string;
  base_price: number;
  category?: string;
  sizes?: Array<{ name: string; price_modifier: number }>;
  modifiers?: Array<{ name: string; price: number }>;
  options?: any;
}

interface MenuData {
  coffee: MenuItem[];
  pastries: MenuItem[];
  donuts: MenuItem[];
  beverages: MenuItem[];
  snacks: MenuItem[];
  kitchen_menu: MenuItem[];
  specialty_drinks: MenuItem[];
}

const AdminPage = () => {
  const [menuData, setMenuData] = useState<MenuData>({
    coffee: [],
    pastries: [],
    donuts: [],
    beverages: [],
    snacks: [],
    kitchen_menu: [],
    specialty_drinks: []
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('coffee');
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showModifiers, setShowModifiers] = useState(false);

  const categories = [
    { key: 'coffee', label: 'Coffee', icon: '☕' },
    { key: 'pastries', label: 'Pastries', icon: '🥐' },
    { key: 'donuts', label: 'Donuts', icon: '🍩' },
    { key: 'beverages', label: 'Beverages', icon: '🥤' },
    { key: 'snacks', label: 'Snacks', icon: '🥗' },
    { key: 'kitchen_menu', label: 'Kitchen Menu', icon: '🍽️' },
    { key: 'specialty_drinks', label: 'Specialty Drinks', icon: '🧋' }
  ];

  const [formData, setFormData] = useState<MenuItem>({
    id: '',
    name: '',
    description: '',
    base_price: 0,
    category: selectedCategory,
    sizes: [],
    modifiers: []
  });

  const [newSize, setNewSize] = useState({ name: '', price_modifier: 0 });
  const [newModifier, setNewModifier] = useState({ name: '', price: 0 });

  useEffect(() => {
    loadMenuData();
  }, []);

  const loadMenuData = async () => {
    try {
      const response = await fetch('/api/menu-data');
      const data = await response.json();
      setMenuData(data);
    } catch (error) {
      console.error('Failed to load menu data:', error);
    }
  };

  const saveMenuData = async (data: MenuData) => {
    try {
      const response = await fetch('/api/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setMenuData(data);
      }
    } catch (error) {
      console.error('Failed to save menu data:', error);
    }
  };

  const handleAddItem = () => {
    const newItem: MenuItem = {
      id: `item_${Date.now()}`,
      name: formData.name,
      description: formData.description,
      base_price: formData.base_price,
      category: selectedCategory,
      sizes: formData.sizes || [],
      modifiers: formData.modifiers || [],
      options: {}
    };

    const updatedMenu = {
      ...menuData,
      [selectedCategory]: [...menuData[selectedCategory as keyof MenuData], newItem]
    };

    saveMenuData(updatedMenu);
    resetForm();
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsAddingNew(false);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    const updatedMenu = {
      ...menuData,
      [selectedCategory]: menuData[selectedCategory as keyof MenuData].map(item =>
        item.id === editingItem.id ? { ...formData, category: selectedCategory } : item
      )
    };

    saveMenuData(updatedMenu);
    resetForm();
  };

  const handleDeleteItem = (itemId: string, itemIndex: number) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedMenu = {
        ...menuData,
        [selectedCategory]: menuData[selectedCategory as keyof MenuData].filter((item, index) => 
          item.id ? item.id !== itemId : index !== itemIndex
        )
      };

      saveMenuData(updatedMenu);
    }
  };

  const resetForm = () => {
    setFormData({
      id: '',
      name: '',
      description: '',
      base_price: 0,
      category: selectedCategory,
      sizes: [],
      modifiers: []
    });
    setEditingItem(null);
    setIsAddingNew(false);
    setNewSize({ name: '', price_modifier: 0 });
    setNewModifier({ name: '', price: 0 });
  };

  const addSize = () => {
    if (newSize.name) {
      setFormData({
        ...formData,
        sizes: [...(formData.sizes || []), { ...newSize }]
      });
      setNewSize({ name: '', price_modifier: 0 });
    }
  };

  const addModifier = () => {
    if (newModifier.name) {
      setFormData({
        ...formData,
        modifiers: [...(formData.modifiers || []), { ...newModifier }]
      });
      setNewModifier({ name: '', price: 0 });
    }
  };

  const removeSize = (index: number) => {
    const newSizes = formData.sizes?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, sizes: newSizes });
  };

  const removeModifier = (index: number) => {
    const newModifiers = formData.modifiers?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, modifiers: newModifiers });
  };

  const currentItems = menuData[selectedCategory as keyof MenuData] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Image
                src="/openai-logomark.svg"
                alt="OpenAI Logo"
                width={24}
                height={24}
                className="mr-3"
              />
              <h1 className="text-2xl font-bold text-gray-900">Shotted Coffee Admin</h1>
            </div>
            <a
              href="/"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to App
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => {
                      setSelectedCategory(category.key);
                      resetForm();
                    }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                      selectedCategory === category.key
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl mr-3">{category.icon}</span>
                    <span className="font-medium">{category.label}</span>
                    <span className="ml-auto text-sm text-gray-500">
                      {menuData[category.key as keyof MenuData]?.length || 0}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Items List */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {categories.find(c => c.key === selectedCategory)?.label} Items
                  </h2>
                  <button
                    onClick={() => {
                      setIsAddingNew(true);
                      setEditingItem(null);
                      resetForm();
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    + Add Item
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {currentItems.map((item, index) => (
                  <div key={item.id || `item-${index}`} className="p-6 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-lg font-semibold text-green-600">
                            ${item.base_price.toFixed(2)}
                          </span>
                          {item.sizes && item.sizes.length > 0 && (
                            <span className="text-sm text-gray-500">
                              {item.sizes.length} size{item.sizes.length !== 1 ? 's' : ''}
                            </span>
                          )}
                          {item.modifiers && item.modifiers.length > 0 && (
                            <span className="text-sm text-gray-500">
                              {item.modifiers.length} modifier{item.modifiers.length !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id || '', index)}
                          className="text-red-600 hover:text-red-800 px-3 py-1 rounded text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {currentItems.length === 0 && (
                  <div className="p-6 text-center text-gray-500">
                    No items in this category yet.
                  </div>
                )}
              </div>
            </div>

            {/* Add/Edit Form */}
            {(isAddingNew || editingItem) && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isAddingNew ? 'Add New Item' : 'Edit Item'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Item Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Vanilla Latte"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Base Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.base_price}
                      onChange={(e) => setFormData({ ...formData, base_price: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="4.50"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Rich espresso with steamed milk and vanilla..."
                  />
                </div>

                {/* Sizes Section */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-md font-medium text-gray-900">Sizes</h4>
                    <button
                      onClick={() => setShowModifiers(false)}
                      className={`px-3 py-1 rounded text-sm ${
                        !showModifiers ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
                      }`}
                    >
                      Manage Sizes
                    </button>
                  </div>

                  {!showModifiers && (
                    <div className="space-y-3">
                      {formData.sizes?.map((size, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{size.name}</span>
                          <span className="text-sm text-gray-500">+${size.price_modifier.toFixed(2)}</span>
                          <button
                            onClick={() => removeSize(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}

                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newSize.name}
                          onChange={(e) => setNewSize({ ...newSize, name: e.target.value })}
                          placeholder="Size name (e.g., Large)"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={newSize.price_modifier}
                          onChange={(e) => setNewSize({ ...newSize, price_modifier: parseFloat(e.target.value) || 0 })}
                          placeholder="+$"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <button
                          onClick={addSize}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Modifiers Section */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-md font-medium text-gray-900">Modifiers</h4>
                    <button
                      onClick={() => setShowModifiers(true)}
                      className={`px-3 py-1 rounded text-sm ${
                        showModifiers ? 'bg-blue-100 text-blue-700' : 'text-gray-600'
                      }`}
                    >
                      Manage Modifiers
                    </button>
                  </div>

                  {showModifiers && (
                    <div className="space-y-3">
                      {formData.modifiers?.map((modifier, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{modifier.name}</span>
                          <span className="text-sm text-gray-500">+${modifier.price.toFixed(2)}</span>
                          <button
                            onClick={() => removeModifier(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}

                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newModifier.name}
                          onChange={(e) => setNewModifier({ ...newModifier, name: e.target.value })}
                          placeholder="Modifier name (e.g., Extra Shot)"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <input
                          type="number"
                          step="0.01"
                          value={newModifier.price}
                          onChange={(e) => setNewModifier({ ...newModifier, price: parseFloat(e.target.value) || 0 })}
                          placeholder="+$"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                        <button
                          onClick={addModifier}
                          className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={isAddingNew ? handleAddItem : handleUpdateItem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {isAddingNew ? 'Add Item' : 'Update Item'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
