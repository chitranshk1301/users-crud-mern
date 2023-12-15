import React, { useMemo } from 'react';
import { useTable, usePagination, useSortBy } from 'react-table';
import { Link } from 'react-router-dom';

const EmployeeList = ({ data }) => {
	const columns = useMemo(
		() => [
			{ Header: 'Name', accessor: 'name' },
			{ Header: 'Age', accessor: 'age' },
			{ Header: 'Department', accessor: 'department' },
			{ Header: 'Position', accessor: 'position' },
			{ Header: 'Email', accessor: 'email' },
			{ Header: 'Phone', accessor: 'phone' },
			{ Header: 'Salary', accessor: 'salary' },
		],
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		nextPage,
		previousPage,
		canNextPage,
		canPreviousPage,
		prepareRow,
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0 },
		},
		useSortBy,
		usePagination
	);

	return (
		<div className="container mt-4">
			<table {...getTableProps()} className="table table-striped">
				<thead className="thead-dark">
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th {...column.getHeaderProps(column.getSortByToggleProps())}>
									{column.render('Header')}
									<span className="ml-2">
										{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{page.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => (
									<td {...cell.getCellProps()}>
										{cell.column.Header === 'Name' ? (
											<Link to={`/employee/${row.original._id}`} className="text-decoration-none">{cell.render('Cell')}</Link>
										) : (
											cell.render('Cell')
										)}
									</td>
								))}
							</tr>
						);
					})}
				</tbody>
			</table>
			<div className="d-flex justify-content-between mt-3">
				<button className="btn btn-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
					Previous Page
				</button>
				<button className="btn btn-primary" onClick={() => nextPage()} disabled={!canNextPage}>
					Next Page
				</button>
			</div>
		</div>
	);
};

export default EmployeeList;
