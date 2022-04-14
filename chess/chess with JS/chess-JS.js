function tableCreate(row, col){
    let body = document.body;
    body.style.justifyContent = 'center';
    body.style.display = "grid";

    let tbl  = document.createElement('table');
    tbl.style.width  = '504px';
    tbl.style.height  = '504px';
    tbl.style.border = '1px solid black';

    for(let i = 0; i < row; i++){
        let tr = tbl.insertRow();
        for(let j = 0; j < col; j++){
                let td = tr.insertCell();
                td.style.border = '1px solid black';
                td.style.backgroundColor = (i%2 === j%2) ? "white" : "black";
        }  
    }
    body.appendChild(tbl);
}

tableCreate(8,8);
