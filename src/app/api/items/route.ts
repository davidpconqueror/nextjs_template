import { NextResponse } from "next/server";

interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "draft" | "archived";
  createdAt: string;
}

let items: Item[] = [
  {
    id: "item-1",
    name: "Redux Toolkit & StoreProvider",
    description: "Configured using makeStore and typed hooks per Next.js App Router standards.",
    category: "Client State",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "item-2",
    name: "RTK Query Data Caching",
    description: "Automated caching, background synchronization, polling, and optimistic updates.",
    category: "Server State",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "item-3",
    name: "Tailwind CSS v4 & shadcn/ui",
    description: "Tailwind 4 styling tokens with accessible base primitives and Lucide icons.",
    category: "UI Design",
    status: "active",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem: Item = {
      id: `item-${Date.now()}`,
      name: body.name || "Untitled Item",
      description: body.description || "No description provided.",
      category: body.category || "General",
      status: body.status || "active",
      createdAt: new Date().toISOString(),
    };
    items = [newItem, ...items];
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing item ID" }, { status: 400 });
  }
  items = items.filter((item) => item.id !== id);
  return NextResponse.json({ success: true, id });
}
