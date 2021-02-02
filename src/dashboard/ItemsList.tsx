import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ErrorResponse } from "core/types";
import Table, { TableColumns } from "dashboard/components/Table";
import useQuery from "dashboard/utils/useQuery";
import React from "react";
import { Link } from "react-router-dom";
import Errors from "./utils/Errors";

export default function ItemsList<T extends { id: string | number }>({
  singular,
  plural,
  path,
  columns,
  legend,
  apipath,
}: {
  singular: string;
  columns: TableColumns<T>;
  path: string;
  plural: string;
  legend?: string | JSX.Element;
  apipath: string;
}) {
  const { result, loading } = useQuery<{ items: T[] }>(apipath);
  const items = result && "items" in result ? result.items : [];

  return (
    <>
      <Errors errors={(result as ErrorResponse)?.errors} />
      <header>
        <div>
          <h1>{plural}</h1>
          {legend && <div className="legend">{legend}</div>}
        </div>
        <Link to={`${path}/new`} className="button-primary">
          <FontAwesomeIcon icon={faPlus} />
          New {singular}
        </Link>
      </header>
      <section>
        <Table
          keyField="id"
          items={items}
          isLoading={loading}
          columns={{
            ...columns,
            edit: {
              render: ({ id }) => (
                <Link to={`${path}/${id}`} className="button-alt">
                  Edit
                </Link>
              ),
            },
          }}
        />
      </section>
    </>
  );
}
