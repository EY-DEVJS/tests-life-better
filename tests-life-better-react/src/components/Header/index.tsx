import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const Header = () => {
  return (
    <div className="flex align-items-center mb-3 lg:justify-content-between">
      <div className="flex align-items-center ">
        <i className="pi pi-image mr-4" style={{ fontSize: "4rem" }} />
        <h1>Sklep</h1>
      </div>
      <div>
        <i className="pi pi-home mr-4" style={{ fontSize: "4rem" }} />
        <i className="pi pi-shopping-cart mr-4" style={{ fontSize: "4rem" }} />
        <i className="pi pi-user-edit mr-4" style={{ fontSize: "4rem" }} />
      </div>
    </div>
  );
};

export default Header;
