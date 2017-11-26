goog.provide('tableLib.table');
goog.provide('tableLib.table.Row');

goog.require('goog.dom');

tableLib.table.fillTable = function(headerData,data, container) {

  while (container.firstChild) {
      container.removeChild(container.firstChild);
  }
  var header=tableLib.table.createHeader(headerData,container);
  var body=tableLib.table.createBody(data,container);

};


tableLib.table.createBody = function(data, container) {

  this.bodyContainer=goog.dom.createDom('tbody');
  goog.dom.appendChild(container,this.bodyContainer);

  var body=new tableLib.table.Body(data,this.bodyContainer);
  body.makeBodyDom();
  return body;
};

tableLib.table.Row=function(rowData){
    this.name=rowData.name;
    this.salesTarget=rowData.salesTarget;
    this.profit=rowData.profit;
    this.satisfaction=rowData.satisfaction;
    this.overall=((this.salesTarget+this.profit+this.satisfaction)/3).toFixed(1);
    this.salesTarget=this.salesTarget.toFixed(1);
    this.profit=this.profit.toFixed(1);
    this.satisfaction=this.satisfaction.toFixed(1);

    this.makeRowDom=function()
    {
      this.rowHeader=goog.dom.createDom('tr');

      this.nameElem=goog.dom.createDom('td',null,this.name);
      goog.dom.appendChild(this.rowHeader,this.nameElem);

      this.overElem=goog.dom.createDom('td',null,this.overall);
      goog.dom.appendChild(this.rowHeader,this.overElem);

      this.salesElem=goog.dom.createDom('td',null,this.salesTarget);
      goog.dom.appendChild(this.rowHeader,this.salesElem);

      this.profitElem=goog.dom.createDom('td',null,this.profit);
      goog.dom.appendChild(this.rowHeader,this.profitElem);

      this.satisElem=goog.dom.createDom('td',null,this.satisfaction);
      goog.dom.appendChild(this.rowHeader,this.satisElem);
      return this.rowHeader;

    };
};

tableLib.table.Body = function(data,container) {
  this.data = data;
  this.parent = container;

  this.makeBodyDom = function(){
    this.rows=[];
    for(var i=0;i<data.length;i++)
    {
      var row=new tableLib.table.Row(data[i]);
      var rowElem=row.makeRowDom();
      goog.dom.appendChild(this.parent,rowElem);
      this.rows.push(row);
    }
    };
};



tableLib.table.createHeader = function(headerData, container) {

  var header=new tableLib.table.Header(headerData,container);
  header.makeHeaderDom();
  return header;
};

tableLib.table.Header = function(headerData, noteContainer) {
  this.headerData = headerData;
  this.parent = noteContainer;
  this.makeHeaderDom = function(){
    this.headerElement=goog.dom.createDom('thead');
    this.contentElements=[];
    for(var i=0;i<this.headerData.length;i++)
    {
      var contentElement=goog.dom.createDom('th',null,this.headerData[i]);
      goog.dom.appendChild(this.headerElement, contentElement);
      this.contentElements.push(contentElement);
    }
    goog.dom.appendChild(this.parent,this.headerElement);
  };
};
