import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const menuFilePath = path.join(process.cwd(), 'src/app/agentConfigs/barista/menu.json');

// Load menu data from JSON file
function loadMenuData() {
  try {
    const data = fs.readFileSync(menuFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading menu data:', error);
    return {
      coffee: [],
      pastries: [],
      donuts: [],
      beverages: [],
      snacks: [],
      kitchen_menu: [],
      specialty_drinks: []
    };
  }
}

// Save menu data to JSON file
function saveMenuData(data: any) {
  try {
    fs.writeFileSync(menuFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving menu data:', error);
    return false;
  }
}

// GET - Retrieve menu data
export async function GET() {
  try {
    const menuData = loadMenuData();
    return NextResponse.json(menuData);
  } catch (error) {
    console.error('Error retrieving menu data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve menu data' },
      { status: 500 }
    );
  }
}

// POST - Update menu data
export async function POST(request: NextRequest) {
  try {
    const menuData = await request.json();
    
    // Validate the data structure
    const requiredCategories = ['coffee', 'pastries', 'donuts', 'beverages', 'snacks', 'kitchen_menu', 'specialty_drinks'];
    for (const category of requiredCategories) {
      if (!Array.isArray(menuData[category])) {
        return NextResponse.json(
          { error: `Invalid data structure: ${category} must be an array` },
          { status: 400 }
        );
      }
    }

    // Validate each menu item
    for (const category of requiredCategories) {
      for (const item of menuData[category]) {
        if (!item.id || !item.name || typeof item.base_price !== 'number') {
          return NextResponse.json(
            { error: 'Invalid menu item: missing required fields (id, name, base_price)' },
            { status: 400 }
          );
        }
      }
    }

    const success = saveMenuData(menuData);
    
    if (success) {
      return NextResponse.json({ message: 'Menu data updated successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to save menu data' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error updating menu data:', error);
    return NextResponse.json(
      { error: 'Failed to update menu data' },
      { status: 500 }
    );
  }
}

// PUT - Add a new menu item
export async function PUT(request: NextRequest) {
  try {
    const { item, category } = await request.json();
    
    if (!item || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: item and category' },
        { status: 400 }
      );
    }

    const menuData = loadMenuData();
    
    if (!menuData[category]) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Add the new item
    menuData[category].push(item);
    
    const success = saveMenuData(menuData);
    
    if (success) {
      return NextResponse.json({ message: 'Item added successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to add item' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error adding menu item:', error);
    return NextResponse.json(
      { error: 'Failed to add menu item' },
      { status: 500 }
    );
  }
}

// DELETE - Remove a menu item
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get('id');
    const category = searchParams.get('category');
    
    if (!itemId || !category) {
      return NextResponse.json(
        { error: 'Missing required parameters: id and category' },
        { status: 400 }
      );
    }

    const menuData = loadMenuData();
    
    if (!menuData[category]) {
      return NextResponse.json(
        { error: 'Invalid category' },
        { status: 400 }
      );
    }

    // Remove the item
    menuData[category] = menuData[category].filter((item: any) => item.id !== itemId);
    
    const success = saveMenuData(menuData);
    
    if (success) {
      return NextResponse.json({ message: 'Item deleted successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to delete item' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return NextResponse.json(
      { error: 'Failed to delete menu item' },
      { status: 500 }
    );
  }
}
