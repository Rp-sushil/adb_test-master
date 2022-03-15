function Form({handleSubmit}) {
    return (
        <form id="my-Form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="todo">ToDo: </label>
                <input type="text" id="input_box" />
            </div>
          <div style={{"marginTop": "5px"}}>
                <button id="add_button" type="submit">Add ToDo!</button>
          </div>
        </form>
    );
}

export default Form;