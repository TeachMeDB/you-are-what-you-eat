import { ManageInfo } from '@/models/manage_info';

const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImNlcnQtYnVpbHQtaW4iLCJ0eXAiOiJKV1QifQ.eyJvd25lciI6Im9yZ2FuaXphdGlvbl9kYmtzIiwibmFtZSI6IjEwMDEiLCJjcmVhdGVkVGltZSI6IjIwMjItMDctMjhUMDE6NDk6MDBaIiwidXBkYXRlZFRpbWUiOiIiLCJpZCI6ImZlYWM5YWRhLWFlNzYtNDIyZC05Y2Y0LTcyYjFlZGVmZjYxNiIsInR5cGUiOiJub3JtYWwtdXNlciIsInBhc3N3b3JkIjoiIiwicGFzc3dvcmRTYWx0IjoiIiwiZGlzcGxheU5hbWUiOiIxMDAxIiwiZmlyc3ROYW1lIjoiIiwibGFzdE5hbWUiOiIiLCJhdmF0YXIiOiJodHRwczovL2Nhc2Jpbi5vcmcvaW1nL2Nhc2Jpbi5zdmciLCJwZXJtYW5lbnRBdmF0YXIiOiIiLCJlbWFpbCI6IiIsImVtYWlsVmVyaWZpZWQiOmZhbHNlLCJwaG9uZSI6IiIsImxvY2F0aW9uIjoiIiwiYWRkcmVzcyI6W10sImFmZmlsaWF0aW9uIjoiIiwidGl0bGUiOiIiLCJpZENhcmRUeXBlIjoiIiwiaWRDYXJkIjoiIiwiaG9tZXBhZ2UiOiIiLCJiaW8iOiIiLCJyZWdpb24iOiIiLCJsYW5ndWFnZSI6IiIsImdlbmRlciI6IiIsImJpcnRoZGF5IjoiIiwiZWR1Y2F0aW9uIjoiIiwic2NvcmUiOjIwMDAsImthcm1hIjowLCJyYW5raW5nIjozLCJpc0RlZmF1bHRBdmF0YXIiOmZhbHNlLCJpc09ubGluZSI6ZmFsc2UsImlzQWRtaW4iOmZhbHNlLCJpc0dsb2JhbEFkbWluIjpmYWxzZSwiaXNGb3JiaWRkZW4iOmZhbHNlLCJpc0RlbGV0ZWQiOmZhbHNlLCJzaWdudXBBcHBsaWNhdGlvbiI6ImFwcGxpY2F0aW9uX2Ria3MiLCJoYXNoIjoiIiwicHJlSGFzaCI6IiIsImNyZWF0ZWRJcCI6IiIsImxhc3RTaWduaW5UaW1lIjoiIiwibGFzdFNpZ25pbklwIjoiIiwiZ2l0aHViIjoiIiwiZ29vZ2xlIjoiIiwicXEiOiIiLCJ3ZWNoYXQiOiIiLCJ1bmlvbklkIjoiIiwiZmFjZWJvb2siOiIiLCJkaW5ndGFsayI6IiIsIndlaWJvIjoiIiwiZ2l0ZWUiOiIiLCJsaW5rZWRpbiI6IiIsIndlY29tIjoiIiwibGFyayI6IiIsImdpdGxhYiI6IiIsImFkZnMiOiIiLCJiYWlkdSI6IiIsImFsaXBheSI6IiIsImNhc2Rvb3IiOiIiLCJpbmZvZmxvdyI6IiIsImFwcGxlIjoiIiwiYXp1cmVhZCI6IiIsInNsYWNrIjoiIiwic3RlYW0iOiIiLCJiaWxpYmlsaSI6IiIsIm9rdGEiOiIiLCJkb3V5aW4iOiIiLCJjdXN0b20iOiIiLCJ3ZWJhdXRobkNyZWRlbnRpYWxzIjpudWxsLCJsZGFwIjoiIiwicHJvcGVydGllcyI6e30sInNjb3BlIjoib3BlbmlkIiwiaXNzIjoiaHR0cHM6Ly8xMjAuNTUuNDcuNTU6ODAwMSIsInN1YiI6ImZlYWM5YWRhLWFlNzYtNDIyZC05Y2Y0LTcyYjFlZGVmZjYxNiIsImF1ZCI6WyI4MjczN2FhYzhlYzg5MzE1YzIyMCJdLCJleHAiOjE2NjAzNTk0MTUsIm5iZiI6MTY1OTc1NDYxNSwiaWF0IjoxNjU5NzU0NjE1fQ.YbG7pgvZaDY0F0GOq50DMfNd7dFTqO7VHf7fef5FaNZJuC4ktf4CeBry2FnGFYS3aoOngUJUw191CpPbw4rdOUBmeAVNPBYIc7io9QoWlAHuYdwONQUyVoOyEUzHQJFNz-KU34ayVe9ajtXz0ihiSXrMt0QGEYOWbwxxfaExliPV5XVZ1cd_c34oKZ4yVVRgl6grANmurOWiwIX5VuxjBb9bzg1Q6yRQ7SZJc16vhER_I9AaThjPjJ5uOgz5Zcxr8iP7AidWTQ0NKrsMVK16KfHjOeFQmpJatdPwFL5G4fq4GxVtBXyO7CaMtxzg_4sOEe_6EqLhsSKR3uc4b8hPUdo4LmEfvCy6-xQO2RKIbpCP9ddwSiP1Vn0AMpOcA01RNANu4V6drg5eIiidaMAl_uJFOCNvyptSwz27DODZYLK9ZdJ_RD5ZvBXi7QZ9gXDK0oNR60Xo3wuAQArAhFz1qJ4o7dYsDbdIZnxxqw9nxRy0sHIL6VG4cb-40MpaESH3bt133wCxvClRzz47qERk6CQqjZ_lgFZm82qLtXgSqMGSd8sCPTH0_O1nDSLkrLy-v8Lz3DZFZJRsTtKS67Qw9FMrs13Hq7wJyNaXFhvmQuPtbboQxUVlgvr-ksC4_b0BsqSH4BDaB91pwMJ_x6IhRy1nshMuRP0bCfGB9Ry1kN8';

class QueryManageApi {
  public getManageList: () => Promise<ManageInfo[]> = async () => {
    try {
      // return [
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '001',
      //     assets_type: '001',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '002',
      //     assets_type: '002',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '003',
      //     assets_type: '003',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '004',
      //     assets_type: '004',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '005',
      //     assets_type: '005',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '006',
      //     assets_type: '006',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      //   {
      //     employee_id: "1",
      //     employee_name: "张三",
      //     assets_id: '007',
      //     assets_type: '007',
      //     manage_type: '维护',
      //     manage_date: '2022-01-08',
      //     manage_reason: '年久失修',
      //     manage_cost: '100元',
      //   },
      // ];
      const r = await (await
          fetch(`http://106.14.212.200:8000/app/api/Asset/GetAssetRecord?token=${token}`)
      ).text();
      const content = JSON.parse(r) || {};
      return (content.data || []) as ManageInfo[];
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public addManage: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/manages/Asset/PostAddAssetRecord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...params, token }),
          })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  public updateManage: (params: any) => Promise<string> = async (params) => {
    try {
      return await (await
          fetch('http://106.14.212.200:8000/app/api/Asset/PostUpdateAssetRecord', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...params, token }),
          })
      ).text();
    } catch (err) {
      console.log(err);
      return null;
    }
  };

}

export const queryManageApi = new QueryManageApi();