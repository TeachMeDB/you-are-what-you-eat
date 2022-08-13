import CurOrders1 from "@/content/Kitchen/Order";
import SidebarLayout from '@/layouts/SidebarLayout';
import CurOrders from "@/content/Kitchen/Order/CurOrder";
function curOrder() {

    return (
        <CurOrders />
    )
}

curOrder.getLayout = (page) => (
    <SidebarLayout>{page}</SidebarLayout>
);


export default curOrder;

