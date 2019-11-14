$(function() {
  function buildHTML(message) {
    const img = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`;
    const html =
      `<div class=message>
        <div class="upper-message">
          <div class="upper-message__user-name">
          ${message.name}
          </div>
          <div class="upper-message__date">
          ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
          ${message.content}
          </p>
          ${img}
        </div>
      </div> `;
    return html;
  }
  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
      .done(data => {
        $(".messages").append(buildHTML(data));
        $(".form__submit").prop("disabled", false);
        $("form")[0].reset();
        $(".messages").animate(
          { scrollTop: $(".messages")[0].scrollHeight },
          "fast"
        );
      })
      .fail(() => {
        alert("error");
      });
  });
});
