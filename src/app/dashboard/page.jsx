import { redirect } from 'next/navigation';

const DashboardPage = () => {
    redirect('/dashboard/add-pets');
};

export default DashboardPage;