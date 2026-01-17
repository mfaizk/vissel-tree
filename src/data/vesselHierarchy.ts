import { HierarchyNode } from '@/types/hierarchy';

export const vesselHierarchyData: HierarchyNode = {
  id: 'equipments',
  name: 'Equipments',
  type: 'equipment-type',
  children: [
    {
      id: 'engine',
      name: 'Engine',
      type: 'equipment',
      children: [
        {
          id: 'main-engine-propulsion',
          name: 'Main Engine & Propulsion',
          type: 'equipment-type',
          children: [
            {
              id: 'main-engine',
              name: 'Main Engine',
              type: 'equipment',
              children: [
                {
                  id: 'air-exhaust-system',
                  name: 'Air & Exhaust System',
                  type: 'assembly',
                  children: [
                    { id: 'me-turbocharger', name: 'ME Turbocharger', type: 'component' },
                    { id: 'air-filter', name: 'Air Filter', type: 'component' },
                    { id: 'exhaust-manifold', name: 'Exhaust Manifold', type: 'component-draft' }
                  ]
                },
                {
                  id: 'control-safety-system',
                  name: 'Control & Safety System',
                  type: 'assembly',
                  children: [
                    { id: 'governor', name: 'Governor', type: 'component' },
                    { id: 'safety-valve', name: 'Safety Valve', type: 'component' }
                  ]
                },
                {
                  id: 'fuel-system',
                  name: 'Fuel System',
                  type: 'assembly',
                  children: [
                    { id: 'fuel-pump', name: 'Fuel Pump', type: 'component' },
                    { id: 'fuel-injector', name: 'Fuel Injector', type: 'component' }
                  ]
                },
                {
                  id: 'cooling-water-system',
                  name: 'Cooling Water System',
                  type: 'assembly',
                  children: [
                    { id: 'water-pump', name: 'Water Pump', type: 'component' },
                    { id: 'thermostat', name: 'Thermostat', type: 'component' }
                  ]
                },
                {
                  id: 'cylinder-liner-lubrication',
                  name: 'Cylinder Liner & Lubrication',
                  type: 'assembly',
                  children: [
                    { id: 'cylinder-liner', name: 'Cylinder Liner', type: 'component' },
                    { id: 'piston-rings', name: 'Piston Rings', type: 'component' }
                  ]
                }
              ]
            },
            {
              id: 'propeller',
              name: 'Propeller',
              type: 'equipment',
              children: [
                { id: 'propeller-blade', name: 'Propeller Blade', type: 'assembly' },
                { id: 'propeller-hub', name: 'Propeller Hub', type: 'assembly' }
              ]
            },
            {
              id: 'shafting',
              name: 'Shafting',
              type: 'equipment-draft',
              children: [
                { id: 'shaft-bearing', name: 'Shaft Bearing', type: 'assembly-draft' },
                { id: 'stern-tube', name: 'Stern Tube', type: 'assembly-draft' }
              ]
            }
          ]
        },
        {
          id: 'power-generation',
          name: 'Power Generation',
          type: 'equipment-type',
          children: [
            { id: 'generator-1', name: 'Generator #1', type: 'equipment' },
            { id: 'generator-2', name: 'Generator #2', type: 'equipment' }
          ]
        },
        {
          id: 'aux-boiler',
          name: 'Aux boiler',
          type: 'equipment-type',
          children: [
            { id: 'boiler-unit', name: 'Boiler Unit', type: 'equipment' }
          ]
        },
        {
          id: 'aux-machinery',
          name: 'Aux machinery',
          type: 'equipment-type',
          children: [
            { id: 'air-compressor', name: 'Air Compressor', type: 'equipment' },
            { id: 'purifier', name: 'Purifier', type: 'equipment' }
          ]
        },
        {
          id: 'electrical-automation',
          name: 'Electrical & Automation',
          type: 'equipment-type',
          children: [
            { id: 'switchboard', name: 'Switchboard', type: 'equipment' },
            { id: 'plc-system', name: 'PLC System', type: 'equipment' }
          ]
        },
        {
          id: 'tank-systems',
          name: 'Tank Systems',
          type: 'equipment-type',
          children: [
            { id: 'fuel-tank', name: 'Fuel Tank', type: 'equipment' },
            { id: 'ballast-tank', name: 'Ballast Tank', type: 'equipment' }
          ]
        },
        {
          id: 'dp-system',
          name: 'DP System',
          type: 'equipment-type',
          children: [
            { id: 'dp-controller', name: 'DP Controller', type: 'equipment' }
          ]
        },
        {
          id: 'others',
          name: 'Others',
          type: 'equipment-type',
          children: []
        }
      ]
    },
    {
      id: 'deck',
      name: 'Deck',
      type: 'equipment',
      children: [
        { id: 'crane', name: 'Crane', type: 'equipment-type' },
        { id: 'winch', name: 'Winch', type: 'equipment-type' }
      ]
    },
    {
      id: 'accommodation',
      name: 'Accomodation',
      type: 'equipment',
      children: [
        { id: 'hvac', name: 'HVAC System', type: 'equipment-type' },
        { id: 'galley', name: 'Galley Equipment', type: 'equipment-type' }
      ]
    },
    {
      id: 'misc',
      name: 'Misc.',
      type: 'equipment',
      children: [
        { id: 'safety-equipment', name: 'Safety Equipment', type: 'equipment-type' },
        { id: 'navigation', name: 'Navigation', type: 'equipment-type' }
      ]
    }
  ]
};
