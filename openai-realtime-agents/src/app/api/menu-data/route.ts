import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Load real menu data from menu.json
function loadRealMenuData() {
  try {
    const menuPath = path.join(process.cwd(), 'menu.json');
    const data = fs.readFileSync(menuPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading menu data:', error);
    return { menu: [] };
  }
}

// Calculate order total based on real menu prices
function calculateOrderTotal(orderItems: any[]) {
  const menuData = loadRealMenuData();
  let total = 0;
  const itemizedBreakdown: any[] = [];

  for (const item of orderItems) {
    const menuItem = menuData.menu.find((m: any) => 
      m.name.toLowerCase().includes(item.name.toLowerCase()) ||
      item.name.toLowerCase().includes(m.name.toLowerCase())
    );

    if (menuItem) {
      let itemTotal = menuItem.base_price;
      let itemBreakdown = {
        name: menuItem.name,
        base_price: menuItem.base_price,
        options: [] as Array<{name: string, price_diff: number}>,
        total: 0
      };

      // Add size price difference
      if (item.size && menuItem.options?.Size) {
        const sizeOption = menuItem.options.Size.choices.find((choice: any) => 
          choice.name.toLowerCase() === item.size.toLowerCase()
        );
        if (sizeOption) {
          itemTotal += sizeOption.price_diff;
          itemBreakdown.options.push({
            name: `Size: ${sizeOption.name}`,
            price_diff: sizeOption.price_diff
          });
        }
      }

      // Add alternative milk price difference
      if (item.alternative_milk && menuItem.options?.['Alternative Milk']) {
        const milkOption = menuItem.options['Alternative Milk'].choices.find((choice: any) => 
          choice.name.toLowerCase() === item.alternative_milk.toLowerCase()
        );
        if (milkOption) {
          itemTotal += milkOption.price_diff;
          itemBreakdown.options.push({
            name: `Milk: ${milkOption.name}`,
            price_diff: milkOption.price_diff
          });
        }
      }

      // Add extras price differences
      if (item.extras && Array.isArray(item.extras)) {
        for (const extra of item.extras) {
          if (menuItem.options?.Extras) {
            const extraOption = menuItem.options.Extras.choices.find((choice: any) => 
              choice.name.toLowerCase() === extra.toLowerCase()
            );
            if (extraOption) {
              itemTotal += extraOption.price_diff;
              itemBreakdown.options.push({
                name: `Extra: ${extraOption.name}`,
                price_diff: extraOption.price_diff
              });
            }
          }
        }
      }

      // Add cold foam price differences
      if (item.cold_foam && menuItem.options?.['Cold Foam']) {
        const foamOption = menuItem.options['Cold Foam'].choices.find((choice: any) => 
          choice.name.toLowerCase() === item.cold_foam.toLowerCase()
        );
        if (foamOption) {
          itemTotal += foamOption.price_diff;
          itemBreakdown.options.push({
            name: `Cold Foam: ${foamOption.name}`,
            price_diff: foamOption.price_diff
          });
        }
      }

      itemBreakdown.total = itemTotal;
      itemizedBreakdown.push(itemBreakdown);
      total += itemTotal;
    } else {
      // Fallback to basic pricing if item not found in real menu
      itemizedBreakdown.push({
        name: item.name,
        base_price: item.base_price || 0,
        options: [],
        total: item.base_price || 0
      });
      total += item.base_price || 0;
    }
  }

  return {
    total: Math.round(total * 100) / 100, // Round to 2 decimal places
    itemizedBreakdown,
    tax: Math.round(total * 0.0875 * 100) / 100, // 8.75% tax
    finalTotal: Math.round((total + total * 0.0875) * 100) / 100
  };
}

// GET - Retrieve menu data
export async function GET() {
  try {
    const menuData = loadRealMenuData();
    
    // Convert flat menu array to categorized structure for admin panel
    const categorizedMenu = {
      coffee: [] as any[],
      pastries: [] as any[],
      donuts: [] as any[],
      beverages: [] as any[],
      snacks: [] as any[],
      kitchen_menu: [] as any[],
      specialty_drinks: [] as any[]
    };
    
    // Categorize items based on their names/descriptions
    menuData.menu.forEach((item: any) => {
      const name = item.name.toLowerCase();
      const description = item.description.toLowerCase();
      
      if (name.includes('coffee') || name.includes('latte') || name.includes('cappuccino') || 
          name.includes('americano') || name.includes('espresso') || name.includes('mocha') ||
          name.includes('cold brew') || name.includes('iced') || name.includes('hot')) {
        categorizedMenu.coffee.push(item);
      } else if (name.includes('cookie') || name.includes('brownie') || name.includes('danish') ||
                 name.includes('croissant') || name.includes('muffin') || name.includes('pastry') ||
                 name.includes('baklava') || name.includes('palmier')) {
        categorizedMenu.pastries.push(item);
      } else if (name.includes('donut') || name.includes('basbosa')) {
        categorizedMenu.donuts.push(item);
      } else if (name.includes('water') || name.includes('juice') || name.includes('soda') ||
                 name.includes('tea') || name.includes('lemonade')) {
        categorizedMenu.beverages.push(item);
      } else if (name.includes('bites') || name.includes('taboulla') || name.includes('hummus')) {
        categorizedMenu.snacks.push(item);
      } else if (name.includes('wrap') || name.includes('sandwich') || name.includes('toast') ||
                 name.includes('avocado') || name.includes('salmon') || name.includes('tuna')) {
        categorizedMenu.kitchen_menu.push(item);
      } else {
        categorizedMenu.specialty_drinks.push(item);
      }
    });
    
    return NextResponse.json(categorizedMenu);
  } catch (error) {
    console.error('Error retrieving menu data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve menu data' },
      { status: 500 }
    );
  }
}

// POST - Calculate order total
export async function POST(request: Request) {
  try {
    const { order_items } = await request.json();
    const calculation = calculateOrderTotal(order_items);
    
    return NextResponse.json({
      subtotal: calculation.total,
      tax: calculation.tax,
      total: calculation.finalTotal,
      itemized_breakdown: calculation.itemizedBreakdown,
      summary: `Subtotal: $${calculation.total.toFixed(2)} | Tax: $${calculation.tax.toFixed(2)} | Total: $${calculation.finalTotal.toFixed(2)}`
    });
  } catch (error) {
    console.error('Error calculating order total:', error);
    return NextResponse.json(
      { error: 'Failed to calculate order total' },
      { status: 500 }
    );
  }
}
