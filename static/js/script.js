var coll = document.getElementsByClassName("collapsible");
var i;
var openCollapsible = null;  // Variable to keep track of the currently open collapsible

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    // Close the currently open collapsible, if any
    if (openCollapsible && openCollapsible !== this) {
      openCollapsible.classList.remove("active");
      var openContent = openCollapsible.nextElementSibling;
      openContent.style.maxHeight = null;
    }

    // Toggle the clicked collapsible
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }

    // Update the currently open collapsible
    openCollapsible = (openCollapsible === this) ? null : this;
  });
}
