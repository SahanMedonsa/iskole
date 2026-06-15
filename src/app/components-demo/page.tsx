import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Card from '../../components/Card';
import Table from '../../components/Table';
import RoleGuard from '../../components/RoleGuard';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

const data = [
  { name: 'Ayesha Perera', role: 'Student', status: 'Active' },
  { name: 'Kasun Silva', role: 'Teacher', status: 'Active' },
  { name: 'Nimal Fernando', role: 'Student', status: 'Inactive' },
];

export default function ComponentsDemoPage() {
  const userRole = 'admin'; // Try changing this to 'student' or 'super-admin'

  return (
    <div className="bg-background min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 space-y-8">
          <h1 className="text-2xl font-bold text-primary mb-4">All Components Demo</h1>
          
          <Card>
            <h2 className="text-xl font-semibold mb-4 text-secondary-text">Card Component</h2>
            <p>This is a Card. Use it to group content.</p>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4 text-secondary-text">Table Component</h2>
            <Table columns={columns} data={data} />
          </Card>

          <Card>
            <h2 className="text-xl font-semibold mb-4 text-secondary-text">RoleGuard Component</h2>
            <p>
              <span className="font-medium">Current user role:</span> <span className="text-accent">{userRole}</span>
            </p>
            <div className="mt-2">
              <RoleGuard role={userRole} allowed={['admin', 'super-admin']}>
                <div className="p-4 bg-success text-white rounded">This is only visible to Admins and Super Admins.</div>
              </RoleGuard>
              <RoleGuard role={userRole} allowed={['student']}>
                <div className="p-4 bg-warning text-white rounded">This is only visible to Students.</div>
              </RoleGuard>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
} 