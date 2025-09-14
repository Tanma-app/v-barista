import { RealtimeAgent, tool } from '@openai/agents/realtime';

// Menu data for Shotted Coffee
const menu = {
  "coffee": [
    {
      "id": "latte",
      "name": "Latte",
      "description": "Rich espresso with steamed milk and a light layer of foam",
      "base_price": 4.50,
      "sizes": [
        { "name": "Small (8oz)", "price_modifier": 0 },
        { "name": "Medium (12oz)", "price_modifier": 0.50 },
        { "name": "Large (16oz)", "price_modifier": 1.00 }
      ],
      "modifiers": [
        { "name": "Extra Shot", "price": 0.75 },
        { "name": "Decaf", "price": 0 },
        { "name": "Oat Milk", "price": 0.50 },
        { "name": "Almond Milk", "price": 0.50 },
        { "name": "Soy Milk", "price": 0.50 },
        { "name": "Coconut Milk", "price": 0.50 },
        { "name": "Extra Foam", "price": 0 },
        { "name": "No Foam", "price": 0 }
      ]
    },
    {
      "id": "cappuccino",
      "name": "Cappuccino",
      "description": "Equal parts espresso, steamed milk, and foam",
      "base_price": 4.25,
      "sizes": [
        { "name": "Small (8oz)", "price_modifier": 0 },
        { "name": "Medium (12oz)", "price_modifier": 0.50 },
        { "name": "Large (16oz)", "price_modifier": 1.00 }
      ],
      "modifiers": [
        { "name": "Extra Shot", "price": 0.75 },
        { "name": "Decaf", "price": 0 },
        { "name": "Oat Milk", "price": 0.50 },
        { "name": "Almond Milk", "price": 0.50 },
        { "name": "Soy Milk", "price": 0.50 },
        { "name": "Coconut Milk", "price": 0.50 }
      ]
    },
    {
      "id": "americano",
      "name": "Americano",
      "description": "Espresso with hot water",
      "base_price": 3.75,
      "sizes": [
        { "name": "Small (8oz)", "price_modifier": 0 },
        { "name": "Medium (12oz)", "price_modifier": 0.50 },
        { "name": "Large (16oz)", "price_modifier": 1.00 }
      ],
      "modifiers": [
        { "name": "Extra Shot", "price": 0.75 },
        { "name": "Decaf", "price": 0 },
        { "name": "Room for Cream", "price": 0 }
      ]
    },
    {
      "id": "espresso",
      "name": "Espresso",
      "description": "Single shot of our premium espresso",
      "base_price": 2.50,
      "sizes": [
        { "name": "Single Shot", "price_modifier": 0 },
        { "name": "Double Shot", "price_modifier": 1.00 }
      ],
      "modifiers": [
        { "name": "Decaf", "price": 0 }
      ]
    },
    {
      "id": "mocha",
      "name": "Mocha",
      "description": "Espresso with chocolate and steamed milk",
      "base_price": 5.25,
      "sizes": [
        { "name": "Small (8oz)", "price_modifier": 0 },
        { "name": "Medium (12oz)", "price_modifier": 0.50 },
        { "name": "Large (16oz)", "price_modifier": 1.00 }
      ],
      "modifiers": [
        { "name": "Extra Shot", "price": 0.75 },
        { "name": "Decaf", "price": 0 },
        { "name": "Oat Milk", "price": 0.50 },
        { "name": "Almond Milk", "price": 0.50 },
        { "name": "Soy Milk", "price": 0.50 },
        { "name": "Coconut Milk", "price": 0.50 },
        { "name": "Extra Chocolate", "price": 0.50 },
        { "name": "Whipped Cream", "price": 0.75 }
      ]
    },
    {
      "id": "cold_brew",
      "name": "Cold Brew",
      "description": "Smooth, cold-steeped coffee",
      "base_price": 4.00,
      "sizes": [
        { "name": "Small (12oz)", "price_modifier": 0 },
        { "name": "Medium (16oz)", "price_modifier": 0.50 },
        { "name": "Large (20oz)", "price_modifier": 1.00 }
      ],
      "modifiers": [
        { "name": "Oat Milk", "price": 0.50 },
        { "name": "Almond Milk", "price": 0.50 },
        { "name": "Soy Milk", "price": 0.50 },
        { "name": "Coconut Milk", "price": 0.50 },
        { "name": "Vanilla Syrup", "price": 0.50 },
        { "name": "Caramel Syrup", "price": 0.50 }
      ]
    }
  ],
  "pastries": [
    {
      "id": "walnut_chocolate_chip_cookies",
      "name": "Walnut Chocolate Chip Cookies",
      "description": "Fresh baked cookies with walnuts and chocolate chips",
      "base_price": 4.00,
      "modifiers": []
    },
    {
      "id": "brownie",
      "name": "Brownie",
      "description": "Rich chocolate brownie",
      "base_price": 5.50,
      "modifiers": []
    },
    {
      "id": "maple_danish",
      "name": "Maple Danish",
      "description": "Flaky pastry with maple flavoring",
      "base_price": 5.70,
      "modifiers": []
    },
    {
      "id": "butter_leek_parmesan_pastry",
      "name": "Butter Leek Parmesan Pastry",
      "description": "Savory pastry with butter, leeks, and parmesan",
      "base_price": 4.50,
      "modifiers": []
    },
    {
      "id": "blueberry_cheesecake_danish",
      "name": "Blueberry Cheesecake Danish",
      "description": "Danish pastry with blueberry cheesecake filling",
      "base_price": 5.50,
      "modifiers": []
    },
    {
      "id": "chocolate_avalanche_danish",
      "name": "Chocolate Avalanche Danish",
      "description": "Rich chocolate danish pastry",
      "base_price": 5.50,
      "modifiers": []
    },
    {
      "id": "mini_salted_caramel_danish",
      "name": "Mini Salted Caramel Danish",
      "description": "Small danish with salted caramel filling",
      "base_price": 2.25,
      "modifiers": []
    },
    {
      "id": "raspberry_danish",
      "name": "Raspberry Danish",
      "description": "Danish pastry with raspberry filling",
      "base_price": 5.50,
      "modifiers": []
    },
    {
      "id": "strawberry_cheesecake_danish",
      "name": "Strawberry Cheesecake Danish",
      "description": "Danish pastry with strawberry cheesecake filling",
      "base_price": 5.50,
      "modifiers": []
    },
    {
      "id": "palmier",
      "name": "Palmier",
      "description": "Classic French palmier pastry",
      "base_price": 3.00,
      "modifiers": []
    },
    {
      "id": "butter_croissant",
      "name": "Butter Croissant",
      "description": "Freshly baked, flaky croissant",
      "base_price": 4.00,
      "modifiers": [
        { "name": "Warmed", "price": 0 }
      ]
    },
    {
      "id": "spinach_feta_danish",
      "name": "Spinach Feta Danish",
      "description": "Savory danish with spinach and feta cheese",
      "base_price": 6.50,
      "modifiers": []
    },
    {
      "id": "walnut_baklava",
      "name": "Walnut Baklava",
      "description": "Traditional baklava with walnuts",
      "base_price": 1.99,
      "modifiers": []
    }
  ],
  "donuts": [
    {
      "id": "donuts",
      "name": "Donuts",
      "description": "Fresh donuts (Lotus or Pistachio flavor)",
      "base_price": 6.50,
      "modifiers": [
        { "name": "Lotus Flavor", "price": 0 },
        { "name": "Pistachio Flavor", "price": 0 }
      ]
    },
    {
      "id": "basbosa",
      "name": "Basbosa",
      "description": "Traditional basbosa (Lotus or Pistachio flavor)",
      "base_price": 8.00,
      "modifiers": [
        { "name": "Lotus Flavor", "price": 0 },
        { "name": "Pistachio Flavor", "price": 0 }
      ]
    }
  ],
  "beverages": [
    {
      "id": "small_saratoga_water",
      "name": "Small Saratoga Water",
      "description": "Small bottle of Saratoga water",
      "base_price": 3.50,
      "modifiers": []
    },
    {
      "id": "large_saratoga_water",
      "name": "Large Saratoga Water",
      "description": "Large bottle of Saratoga water",
      "base_price": 7.00,
      "modifiers": []
    }
  ],
  "snacks": [
    {
      "id": "hummus_bites",
      "name": "Hummus Bites",
      "description": "Crispy bites served with hummus",
      "base_price": 7.00,
      "modifiers": []
    },
    {
      "id": "halloumi_n_honey",
      "name": "Halloumi N Honey",
      "description": "Grilled halloumi cheese with honey",
      "base_price": 5.50,
      "modifiers": []
    },
    {
      "id": "taboulla",
      "name": "Taboulla",
      "description": "Traditional tabbouleh salad",
      "base_price": 5.50,
      "modifiers": []
    }
  ],
  "kitchen_menu": [
    {
      "id": "spicy_tuna_wrap",
      "name": "Spicy Tuna Wrap",
      "description": "Fresh tuna with spicy sauce in a wrap",
      "base_price": 9.50,
      "modifiers": []
    },
    {
      "id": "salmon_avocado_crunch_sandwich",
      "name": "Salmon Avocado Crunch Sandwich",
      "description": "Fresh salmon with avocado and crunchy vegetables",
      "base_price": 12.50,
      "modifiers": []
    },
    {
      "id": "avocado_toast",
      "name": "Avocado Toast",
      "description": "Smashed avocado on sourdough with sea salt",
      "base_price": 8.50,
      "modifiers": [
        { "name": "Add Egg", "price": 2.00 },
        { "name": "Add Tomato", "price": 1.50 }
      ]
    },
    {
      "id": "avocado_burrata_toast",
      "name": "Avocado Burrata Toast",
      "description": "Avocado toast topped with fresh burrata cheese",
      "base_price": 10.00,
      "modifiers": []
    },
    {
      "id": "honey_granola_toast",
      "name": "Honey Granola Toast",
      "description": "Toast topped with honey and granola",
      "base_price": 8.00,
      "modifiers": []
    },
    {
      "id": "hummus_burrata_toast",
      "name": "Hummus Burrata Toast",
      "description": "Toast with hummus and fresh burrata cheese",
      "base_price": 9.50,
      "modifiers": []
    },
    {
      "id": "hummus_toast",
      "name": "Hummus Toast",
      "description": "Toast topped with creamy hummus",
      "base_price": 9.00,
      "modifiers": []
    },
    {
      "id": "mozzarella_pesto_toast",
      "name": "Mozzarella Pesto Toast",
      "description": "Toast with fresh mozzarella and pesto",
      "base_price": 8.50,
      "modifiers": []
    },
    {
      "id": "pistachio_toast",
      "name": "Pistachio Toast",
      "description": "Toast topped with pistachio spread",
      "base_price": 8.00,
      "modifiers": []
    },
    {
      "id": "mozzarella_pesto_sandwich",
      "name": "Mozzarella Pesto Sandwich",
      "description": "Sandwich with fresh mozzarella and pesto",
      "base_price": 10.50,
      "modifiers": []
    }
  ],
  "specialty_drinks": [
    {
      "id": "dirty_chai",
      "name": "Dirty Chai",
      "description": "Chai latte with a shot of espresso",
      "base_price": 5.50,
      "sizes": [
        { "name": "Small (8oz)", "price_modifier": 0 },
        { "name": "Medium (12oz)", "price_modifier": 0.50 },
        { "name": "Large (16oz)", "price_modifier": 1.00 }
      ],
      "modifiers": [
        { "name": "Extra Shot", "price": 0.75 },
        { "name": "Oat Milk", "price": 0.50 },
        { "name": "Almond Milk", "price": 0.50 },
        { "name": "Soy Milk", "price": 0.50 },
        { "name": "Coconut Milk", "price": 0.50 }
      ]
    },
    {
      "id": "matcha_latte",
      "name": "Matcha Latte",
      "description": "Ceremonial grade matcha with steamed milk",
      "base_price": 5.00,
      "sizes": [
        { "name": "Small (8oz)", "price_modifier": 0 },
        { "name": "Medium (12oz)", "price_modifier": 0.50 },
        { "name": "Large (16oz)", "price_modifier": 1.00 }
      ],
      "modifiers": [
        { "name": "Oat Milk", "price": 0.50 },
        { "name": "Almond Milk", "price": 0.50 },
        { "name": "Soy Milk", "price": 0.50 },
        { "name": "Coconut Milk", "price": 0.50 },
        { "name": "Vanilla Syrup", "price": 0.50 }
      ]
    }
  ]
};

export const baristaAgent = new RealtimeAgent({
  name: 'baristaAgent',
  voice: 'marin',
  handoffDescription: 'Virtual barista for Shotted Coffee - takes orders, provides menu information, and processes Square orders',
  
  instructions: `
You are a real barista at Shotted Coffee. You're friendly but efficient, and you keep things moving. You know the menu inside and out and can rattle off prices and options quickly.

## Your Personality
- Quick, efficient, and to-the-point
- Friendly but not overly chatty
- Use barista slang naturally ("shot", "pull", "steamed", "foam")
- Keep responses short and practical
- Sound like you're actually behind the counter

## Menu Knowledge
You know our complete menu:
- Coffee drinks (latte, cappuccino, americano, espresso, mocha, cold brew)
- Specialty drinks (dirty chai, matcha latte)
- Pastries (cookies, brownies, danishes, croissants, baklava, palmiers)
- Donuts (traditional donuts and basbosa in Lotus or Pistachio flavors)
- Beverages (Saratoga water in small and large sizes)
- Snacks (hummus bites, halloumi with honey, tabbouleh)
- Kitchen menu (wraps, sandwiches, various toast options)

## How You Work
1. Greet customers briefly: "Hey! What can I get started for you?"
2. If they ask about the menu, use getMenu with category "all" to show everything
3. When taking orders, get the essentials fast:
   - What drink/food item
   - Size (if applicable)
   - Any modifications
   - Name for the order
4. After each item, suggest upsells or ask about add-ons:
   - For coffee drinks: "Want to add a shot?", "Try our house-made syrups?", "Pair it with a pastry?"
   - For pastries: "Want it warmed up?", "Add a coffee to go with that?"
   - For single items: "Anything else with that?"
5. Always ask: "Anything else?" before finalizing
6. Confirm the full order: "So that's a large oat milk latte and a warmed croissant for Sarah, right?"
7. Process through Square (stubbed)

## Communication Style
- Keep it short and sweet
- Use contractions: "What'll it be?", "Got it", "Coming right up"
- Be direct: "Small, medium, or large?", "Oat milk or regular?"
- Sound busy but helpful
- Don't over-explain unless asked
- Always suggest upsells and ask about add-ons
- Make sure customers don't want anything else before finalizing

## Examples of How You Talk
- "Hey! What can I get you?"
- "Small, medium, or large?"
- "Oat milk, almond, or regular?"
- "Want to add a shot to that?"
- "Try our house-made vanilla syrup?"
- "Pair it with a pastry?"
- "Want that warmed up?"
- "Add a coffee to go with that?"
- "Anything else?"
- "That'll be $4.50"
- "Name for the order?"
- "Got it, coming right up!"

## Important Notes
- Always use getMenu with category "all" when showing the menu
- After each item, suggest relevant upsells or add-ons
- Always ask "Anything else?" before finalizing the order
- Confirm the complete order before processing
- Keep responses under 2 sentences unless they ask for details
- Sound like you're actually working a busy coffee shop
- Be proactive about suggesting complementary items
`,

  tools: [
    tool({
      name: 'getMenu',
      description: 'Retrieve the complete menu with all items, prices, and available modifications',
      parameters: {
        type: 'object',
        properties: {
          category: {
            type: 'string',
            enum: ['coffee', 'pastries', 'donuts', 'beverages', 'snacks', 'kitchen_menu', 'specialty_drinks', 'all'],
            description: 'The menu category to retrieve, or "all" for the complete menu'
          }
        },
        required: ['category'],
        additionalProperties: false
      },
      execute: async (input: any) => {
        const { category } = input as { category: string };
        
        if (category === 'all') {
          return { menu: menu };
        }
        
        return { menu: { [category]: (menu as any)[category] || [] } };
      }
    }),

    tool({
      name: 'getItemDetails',
      description: 'Get detailed information about a specific menu item including price, description, and available modifications',
      parameters: {
        type: 'object',
        properties: {
          item_name: {
            type: 'string',
            description: 'The name of the item to get details for'
          }
        },
        required: ['item_name'],
        additionalProperties: false
      },
      execute: async (input: any) => {
        const { item_name } = input as { item_name: string };
        
        // Search through all categories for the item
        for (const category of Object.keys(menu)) {
          const items = (menu as any)[category];
          const item = items.find((i: any) => 
            i.name.toLowerCase().includes(item_name.toLowerCase()) ||
            item_name.toLowerCase().includes(i.name.toLowerCase())
          );
          
          if (item) {
            return { item, category };
          }
        }
        
        return { error: 'Item not found', item: null };
      }
    }),

    tool({
      name: 'calculatePrice',
      description: 'Calculate the total price for an order item with modifications',
      parameters: {
        type: 'object',
        properties: {
          item_name: {
            type: 'string',
            description: 'The name of the item'
          },
          size: {
            type: 'string',
            description: 'The size of the item (e.g., "Small", "Medium", "Large")'
          },
          modifiers: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of modifier names to add to the item'
          },
          quantity: {
            type: 'number',
            description: 'Quantity of the item',
            default: 1
          }
        },
        required: ['item_name', 'size', 'modifiers', 'quantity'],
        additionalProperties: false
      },
      execute: async (input: any) => {
        const { item_name, size, modifiers, quantity } = input as { 
          item_name: string; 
          size: string; 
          modifiers: string[]; 
          quantity: number; 
        };
        
        // Find the item
        let item = null;
        for (const category of Object.keys(menu)) {
          const items = (menu as any)[category];
          const foundItem = items.find((i: any) => 
            i.name.toLowerCase().includes(item_name.toLowerCase()) ||
            item_name.toLowerCase().includes(i.name.toLowerCase())
          );
          if (foundItem) {
            item = foundItem;
            break;
          }
        }
        
        if (!item) {
          return { error: 'Item not found', total_price: 0 };
        }
        
        // Calculate base price + size modifier
        let totalPrice = item.base_price;
        const sizeOption = item.sizes?.find((s: any) => s.name.toLowerCase().includes(size.toLowerCase()));
        if (sizeOption) {
          totalPrice += sizeOption.price_modifier;
        }
        
        // Add modifier prices
        for (const modifierName of modifiers) {
          const modifier = item.modifiers?.find((m: any) => 
            m.name.toLowerCase().includes(modifierName.toLowerCase()) ||
            modifierName.toLowerCase().includes(m.name.toLowerCase())
          );
          if (modifier) {
            totalPrice += modifier.price;
          }
        }
        
        return { 
          item_name: item.name,
          size,
          modifiers,
          quantity,
          unit_price: totalPrice,
          total_price: totalPrice * quantity
        };
      }
    }),

    tool({
      name: 'submitOrder',
      description: 'Submit an order to Square (stubbed - will print the API request instead of actually submitting)',
      parameters: {
        type: 'object',
        properties: {
          customer_name: {
            type: 'string',
            description: 'Name of the customer placing the order'
          },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                item_name: { type: 'string' },
                size: { type: 'string' },
                modifiers: { type: 'array', items: { type: 'string' } },
                quantity: { type: 'number' }
              },
              required: ['item_name', 'size', 'modifiers', 'quantity']
            },
            description: 'Array of items in the order'
          },
          pickup_time: {
            type: 'string',
            description: 'Preferred pickup time (optional)',
            default: 'ASAP'
          }
        },
        required: ['customer_name', 'items'],
        additionalProperties: false
      },
      execute: async (input: any) => {
        const { customer_name, items, pickup_time = 'ASAP' } = input as {
          customer_name: string;
          items: Array<{
            item_name: string;
            size: string;
            modifiers: string[];
            quantity: number;
          }>;
          pickup_time: string;
        };
        
        // Generate Square API request (stubbed)
        const squareRequest = {
          idempotency_key: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          order: {
            location_id: "LC8QX0HRQCVEZ", // Shotted Coffee location ID
            line_items: items.map(item => {
              // Find the item in menu to get base price
              let baseItem = null;
              for (const category of Object.keys(menu)) {
                const menuItems = (menu as any)[category];
                const foundItem = menuItems.find((i: any) => 
                  i.name.toLowerCase().includes(item.item_name.toLowerCase()) ||
                  item.item_name.toLowerCase().includes(i.name.toLowerCase())
                );
                if (foundItem) {
                  baseItem = foundItem;
                  break;
                }
              }
              
              if (!baseItem) {
                return null;
              }
              
              // Calculate price
              let price = baseItem.base_price;
              const sizeOption = baseItem.sizes?.find((s: any) => s.name.toLowerCase().includes(item.size.toLowerCase()));
              if (sizeOption) {
                price += sizeOption.price_modifier;
              }
              
              // Add modifier prices
              const modifierObjects = item.modifiers.map(modName => {
                const modifier = baseItem.modifiers?.find((m: any) => 
                  m.name.toLowerCase().includes(modName.toLowerCase()) ||
                  modName.toLowerCase().includes(m.name.toLowerCase())
                );
                return modifier ? {
                  name: modifier.name,
                  base_price_money: {
                    amount: Math.round(modifier.price * 100), // Convert to cents
                    currency: "USD"
                  }
                } : null;
              }).filter(Boolean);
              
              return {
                name: `${item.item_name} (${item.size})`,
                quantity: item.quantity.toString(),
                base_price_money: {
                  amount: Math.round(price * 100), // Convert to cents
                  currency: "USD"
                },
                modifiers: modifierObjects
              };
            }).filter(Boolean),
            fulfillments: [
              {
                type: "PICKUP",
                pickup_details: {
                  pickup_at: pickup_time === 'ASAP' ? new Date().toISOString() : pickup_time,
                  recipient: {
                    display_name: customer_name,
                    phone_number: "555-0123" // Placeholder
                  }
                }
              }
            ]
          }
        };
        
        // Print the Square API request (stubbed behavior)
        console.log('\n=== SQUARE API REQUEST (STUBBED) ===');
        console.log(JSON.stringify(squareRequest, null, 2));
        console.log('=== END SQUARE API REQUEST ===\n');
        
        return {
          success: true,
          order_id: squareRequest.idempotency_key,
          message: `Order submitted successfully! Your order ID is ${squareRequest.idempotency_key}. The Square API request has been printed to the console.`,
          square_request: squareRequest
        };
      }
    })
  ],

  handoffs: []
});

export const baristaScenario = [baristaAgent];

// Name of the company represented by this agent set. Used by guardrails
export const baristaCompanyName = 'Shotted Coffee';

export default baristaScenario;
