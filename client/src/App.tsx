import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

type User = {
  id: number;
  name: string;
};

type UsersResponse = {
  data: User[];
  paging: {
    totalResults: number;
    previous?: string;
    next?: string;
  };
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [paging, setPaging] = useState<UsersResponse['paging'] | null>(null);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(2);
  const [sort, setSort] = useState('name');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchUsers = useCallback(async (nextPage: number, nextSize: number, nextSort: string) => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.get<UsersResponse>('http://localhost:3001/api/users', {
        params: {
          page: nextPage,
          size: nextSize,
          sort: nextSort,
        },
      });

      setUsers(response.data.data);
      setPaging(response.data.paging);
      setPage(nextPage);
      setSize(nextSize);
      setSort(nextSort);
    } catch {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(1, 2, 'name');
  }, [fetchUsers]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Users</h1>

      <div style={{ marginBottom: 16 }}>
        <label>
          Sort:
          <select value={sort} onChange={(e) => fetchUsers(1, size, e.target.value)}>
            <option value="name">Name ASC</option>
            <option value="-name">Name DESC</option>
            <option value="id">Id ASC</option>
            <option value="-id">Id DESC</option>
          </select>
        </label>

        <label style={{ marginLeft: 16 }}>
          Size:
          <select value={size} onChange={(e) => fetchUsers(1, Number(e.target.value), sort)}>
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <p>Total Results: {paging?.totalResults ?? 0}</p>

          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.id} - {user.name}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 16 }}>
            <button
              onClick={() => fetchUsers(page - 1, size, sort)}
              disabled={!paging?.previous || loading}
            >
              Previous
            </button>

            <span style={{ margin: '0 12px' }}>Page {page}</span>

            <button
              onClick={() => fetchUsers(page + 1, size, sort)}
              disabled={!paging?.next || loading}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;