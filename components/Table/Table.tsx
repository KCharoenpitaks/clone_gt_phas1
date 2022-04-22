import { Table as AntTable } from "antd";
import styled from "styled-components";
import { margin, MarginProps } from "styled-system";

const Table = styled(AntTable)<MarginProps>`
  ${margin}

  .ant-table-thead {
    .ant-table-cell {
      font-size: 14px;
      font-weight: bold;

      padding: 8px;

      border: none;
      background-color: transparent;
    }

    th:before {
      content: none !important;
    }
  }

  .ant-table-tbody {
    .ant-table-cell {
      padding: 8px;

      border: none;
      background-color: transparent;
    }
  }
`;

export default Table;
