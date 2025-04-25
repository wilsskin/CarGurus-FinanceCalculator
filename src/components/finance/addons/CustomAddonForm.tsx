
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddonItem } from '@/types/financeTypes';

interface CustomAddonFormProps {
  onAdd: (addon: AddonItem) => void;
}

const CustomAddonForm: React.FC<CustomAddonFormProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && !isNaN(Number(price))) {
      onAdd({
        id: `custom-${Date.now()}`,
        name,
        price: Number(price),
      });
      setName('');
      setPrice('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 border-t pt-4">
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add-on name"
            className="h-8"
          />
        </div>
        <div className="w-24">
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            min="0"
            className="h-8"
          />
        </div>
        <Button type="submit" size="sm" disabled={!name || !price} className="h-8">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

export default CustomAddonForm;
