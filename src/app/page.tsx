"use client"

import * as React from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Prospect = {
    id: string
    name: string
    email: string
    status: "pending" | "processing" | "success" | "failed"
    amount: number
    tasks: any[]
    notes: string[]
    emails: string[]
}

const initialData: Prospect[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        status: "success",
        amount: 500,
        tasks: [
            {name: "Wake up", status: 0},
            {name: "Brush", status: 0}
        ],
        notes: ["Demo 1", "Demo 2"],
        emails: ["Email 1", "Email 2"],
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        status: "pending",
        amount: 300,
        tasks: [
            {name: "Breakfast", status: 0},
            {name: "Workout", status: 0}
        ],
        notes: ["Note 3", "Note 4"],
        emails: ["Email 3", "Email 4"],
    },
]

export const columns: ColumnDef<Prospect>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => { table.toggleAllPageRowsSelected(!!value) }}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: true,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: true,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: true,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("status")}</div>
        ),
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: true,
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
        enableSorting: true,
        enableHiding: true,
        enableGlobalFilter: true,
    },
]

export default function CRM() {
    const [data, setData] = React.useState<Prospect[]>(initialData)
    const [task, setTask] = React.useState('')
    const [note, setNote] = React.useState('')
    const [selectedProspect, setSelectedProspect] = React.useState<Prospect | null>(null)
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [isAdding, setIsAdding] = React.useState(false)
    const [newProspect, setNewProspect] = React.useState<Partial<Prospect>>({
        id: "",
        name: "",
        email: "",
        status: "pending",
        amount: 0,
        tasks: [],
        notes: [],
        emails: [],
    })

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    React.useEffect(() => {
        localStorage.setItem('people', JSON.stringify(initialData))
    },[])

    const handleAddProspect = () => {
        setIsAdding(true)
    }

    const handleSaveNewProspect = () => {
        if (
            newProspect.name &&
            newProspect.email &&
            newProspect.status &&
            newProspect.amount !== undefined
        ) {
            setData([...data, { ...newProspect, id: `${data.length + 1}` } as Prospect])
            localStorage.setItem('people', JSON.stringify(data))
            setIsAdding(false)
            setNewProspect({
                id: "",
                name: "",
                email: "",
                status: "pending",
                amount: 0,
                tasks: [],
                notes: [],
                emails: [],
            })
        }
    }

    const handleCancelNewProspect = () => {
        setIsAdding(false)
        setNewProspect({
            id: "",
            name: "",
            email: "",
            status: "pending",
            amount: 0,
            tasks: [],
            notes: [],
            emails: [],
        })
    }

    const handleEditProspect = (id: string, updatedProspect: Partial<Prospect>) => {
        setData(data.map(p => (p.id === id ? { ...p, ...updatedProspect } : p)))
    }

    const handleDeleteProspect = () => {
        const ids = table.getSelectedRowModel().rows.map((data) => { return data.original.id })
        console.log(ids)
        const newData = data.filter(item => selectedProspect?.id != item.id)
        setData(newData)
        console.log(newData)
        localStorage.setItem('people', JSON.stringify(newData))
        setSelectedProspect(null);
    }

    const addTask = () => {
        const newData: Prospect[] = data.map((item: any) => {
            if(item?.id === selectedProspect?.id){
                item.tasks.push({name: task, status: 0})
            }
            return item
        })
        setData(newData)
        localStorage.setItem('people', JSON.stringify(newData))
        setTask('')
    }

    const handleTaskStatus = (name: String) => {
        const newData: Prospect[] = data.map((item: any) => {
            if(item?.id === selectedProspect?.id){
                item.tasks.forEach((task: any) => {
                    if(task.name === name){
                        task.status = 1;
                    }
                });
            }
            return item
        })
        setData(newData)
        localStorage.setItem('people', JSON.stringify(newData))
    }

    const addNote = () => {
        const newData: Prospect[] = data.map((item: any) => {
            if(item?.id === selectedProspect?.id){
                item.notes.push(note)
            }
            return item
        })
        setData(newData)
        localStorage.setItem('people', JSON.stringify(newData))
        setNote('')
    }

    return (
        <div className="flex">
            {!selectedProspect &&
                <div className="w-full">
                    <div className="flex items-center py-4">
                        <Input
                            placeholder="Filter emails..."
                            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                            onChange={(event) =>
                                table.getColumn("email")?.setFilterValue(event.target.value)
                            }
                            className="max-w-sm"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="ml-auto">
                                    Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                className="capitalize"
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(!!value)
                                                }
                                            >
                                                {column.id}
                                            </DropdownMenuCheckboxItem>
                                        )
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button onClick={handleAddProspect} className="ml-4">Add</Button>
                    </div>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                            onClick={() => setSelectedProspect(row.original)}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className="h-24 text-center">
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            }
            {selectedProspect && (
                <div className="w-full ml-4 border pl-4 h-96">
                    <div className="flex h-96">
                        <div className="w-1/3 mb-4 border-r pt-3 px-3">
                            <p className="text-sm" onClick={() => {setSelectedProspect(null)}}>back</p>
                            <div className="flex items-center px-2">
                                <h2 className="text-lg font-semibold">{selectedProspect.name}</h2>
                                <div className="ml-auto">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost">
                                                <DotsHorizontalIcon className="h-5 w-5" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={handleDeleteProspect}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="mx-2">
                                <p>{selectedProspect.email}</p>
                                <p>{selectedProspect.status}</p>
                                <p>${selectedProspect.amount}</p>
                            </div>
                        </div>
                        <div className="w-2/3">
                            <Tabs defaultValue="tasks" className="w-full">
                                <TabsList className="w-full justify-start">
                                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                                    <TabsTrigger value="notes">Notes</TabsTrigger>
                                    <TabsTrigger value="files">Files</TabsTrigger>
                                    <TabsTrigger value="emails">Emails</TabsTrigger>
                                    <TabsTrigger value="calendar">Calendar</TabsTrigger>
                                </TabsList>
                                <TabsContent className='' value="tasks">
                                    <div className="flex mx-1">
                                        <Input className="mr-2" placeholder="task" type="text" value={task} onChange={(e) => setTask(e.target.value)} />
                                        <Button className="ml-auto" onClick={addTask}>Add Task</Button>
                                    </div>
                                    <ul className="mx-1">
                                        {selectedProspect.tasks.map((task, index) => (
                                            <li className="border p-2 mt-1 flex items-center" key={index}>
                                                <div>{task.name}</div>
                                                { task.status === 0 &&
                                                 <div className="ml-auto">
                                                    <Button onClick={(e) => handleTaskStatus(task.name)}>Mark as done</Button>
                                                </div>}
                                                { task.status === 1 && <div className="ml-auto">
                                                    <Button variant='ghost'>Done</Button>
                                                </div> }
                                            </li>
                                        ))}
                                    </ul>
                                </TabsContent>
                                <TabsContent className='' value="notes">
                                    <div className="flex mx-1">
                                        <Input className="mr-2" placeholder="note" type="text" value={note} onChange={(e) => setNote(e.target.value)} />
                                        <Button className="ml-auto" onClick={addNote}>Add Note</Button>
                                    </div>
                                    <ul className="mx-1">
                                        {selectedProspect.notes.map((note, index) => (
                                            <li className="border p-2 mt-1" key={index}>{note}</li>
                                        ))}
                                    </ul>
                                </TabsContent>
                                <TabsContent value="files">
                                    {/* Files content goes here */}
                                    <p>File management features coming soon...</p>
                                </TabsContent>
                                <TabsContent value="emails">
                                    <ul>
                                        {selectedProspect.emails.map((email, index) => (
                                            <li key={index}>{email}</li>
                                        ))}
                                    </ul>
                                </TabsContent>
                                <TabsContent value="calendar">
                                    {/* Calendar content goes here */}
                                    <p>Calendar integration coming soon...</p>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </div>
            )}
            {isAdding && (
                <div className="w-1/3 ml-4 border-l pl-4">
                    <h2 className="text-lg font-semibold mb-4">Add New Prospect</h2>
                    <Input
                        placeholder="Name"
                        value={newProspect.name ?? ""}
                        onChange={(e) => setNewProspect({ ...newProspect, name: e.target.value })}
                        className="mb-2"
                    />
                    <Input
                        placeholder="Email"
                        value={newProspect.email ?? ""}
                        onChange={(e) => setNewProspect({ ...newProspect, email: e.target.value })}
                        className="mb-2"
                    />
                    <Input
                        placeholder="Amount"
                        type="number"
                        value={newProspect.amount?.toString() ?? ""}
                        onChange={(e) => setNewProspect({ ...newProspect, amount: Number(e.target.value) })}
                        className="mb-2"
                    />
                    <Button onClick={handleSaveNewProspect} className="mr-2">Save</Button>
                    <Button variant="outline" onClick={handleCancelNewProspect}>Cancel</Button>
                </div>
            )}
        </div>
    )
}
