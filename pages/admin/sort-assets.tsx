// /admin/sort-assets.tsx
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { supabase } from '@/lib/supabaseClient';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ asset }: { asset: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: asset.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-center gap-4 border p-2 mb-2 bg-white shadow rounded cursor-move"
    >
      <img
        src={`https://satrrkhhycseksxxxjpu.supabase.co/storage/v1/object/public/supplier-files/${asset.file_path}`}
        alt="preview"
        className="w-16 h-12 object-cover rounded"
      />
      <div className="flex-1">
        <p className="text-sm font-medium">{asset.title}</p>
        <p className="text-xs text-gray-500">Order: {asset.display_order}</p>
      </div>
    </div>
  );
}

export default function SortAssetsPage() {
  const [items, setItems] = useState<any[]>([]);
  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    async function fetchAssets() {
      const { data } = await supabase.from('supplier_assets').select('*').order('display_order', { ascending: true });
      if (data) setItems(data);
    }
    fetchAssets();
  }, []);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over.id);
      setItems((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  const handleSave = async () => {
    const updates = items.map((item, index) =>
      supabase.from('supplier_assets').update({ display_order: index }).eq('id', item.id)
    );
    await Promise.all(updates);
    alert('排序已保存');
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">拖拽排序内容</h1>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
            {items.map((asset) => (
              <SortableItem key={asset.id} asset={asset} />
            ))}
          </SortableContext>
        </DndContext>
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          保存排序结果
        </button>
      </div>
    </AdminLayout>
  );
}
