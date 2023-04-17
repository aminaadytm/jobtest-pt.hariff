import axios from "axios";
import { useEffect, useState } from "react";

function Employee() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [employees, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {
    const result = await axios.get("http://127.0.0.1:8000/api/employees");
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {
    event.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/save", {
        name: name,
        address: address,
        mobile: mobile,
      });
      alert("Employee Registation Successfully");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("User Registation Failed");
    }
  }
  async function editEmployee(employees) {
    setName(employees.name);
    setAddress(employees.address);
    setMobile(employees.mobile);
    setId(employees.id);
  }

  async function DeleteEmployee(id) {
    await axios.delete("http://127.0.0.1:8000/api/delete/" + id);
    alert("Employee deleted Successfully");
    Load();
  }

  async function update(event) {
    event.preventDefault();

    try {
      await axios.put(
        "http://127.0.0.1:8000/api/update/" +
          employees.find((u) => u.id === id).id || id,
        {
          id: id,
          name: name,
          address: address,
          mobile: mobile,
        }
      );
      alert("Registation Updateddddd");
      setId("");
      setName("");
      setAddress("");
      setMobile("");
      Load();
    } catch (err) {
      alert("User Registation Failed");
    }
  }

  return (
    <div>
      <h1 class="text-center pt-3">JOBTEST</h1>
      <h2 class="text-center pb-1">PT.Hariff Daya Tunggal Engineering</h2>
      <hr class="border border-1 border-secondary "></hr>
      <div class="container mx-auto p-4 ">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="employee_id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Employee Name</label>
            <input
              type="text"
              class="form-control"
              id="employeeName"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
            <label>Address</label>
            <input
              type="text"
              class="form-control"
              id="employeeAddress"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>

          <div class="form-group">
            <label>Mobile Phone</label>
            <input
              type="text"
              class="form-control"
              id="employeeMobile"
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value);
              }}
            />
          </div>

          <div>
            <button class="btn btn-primary mt-4 me-3" onClick={save}>
              Register
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <div class="d-flex justify-content-center ms-5 me-5">
        <table class="table table-striped text-center" align="center">
          <thead class="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Employee Name</th>
              <th scope="col"> Address</th>
              <th scope="col"> Mobile Phone</th>

              <th scope="col">Option</th>
            </tr>
          </thead>
          {employees.map(function fn(employee) {
            return (
              <tbody>
                <tr>
                  <th scope="row">{employee.id} </th>
                  <td>{employee.name}</td>
                  <td>{employee.address}</td>
                  <td>{employee.mobile}</td>
                  <td>
                    <div class="">
                      <button
                        type="button"
                        class="btn btn-warning me-3"
                        onClick={() => editEmployee(employee)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => DeleteEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
export default Employee;
