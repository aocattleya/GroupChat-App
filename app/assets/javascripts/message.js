$(() => {
  const buildHTML = (message) => {
    const img = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`;
    const html =
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <div class="lower-message__content">
            ${message.content}
            <div class="message__text">
              ${img}
            </div>
          </div>
        </div>`;
    return html;
  }
  $("#new_message").on("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    $.ajax({
      url: $(e.currentTarget).attr("action"),
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
        $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight },"fast");
      })
      .fail(() => {
        alert("error");
      });
  });

  // ----------------------------------------
  // 自動更新機能
  // ----------------------------------------
  const reloadMessages = () => {
    last_message_id = $(".message").last().data("messageId");
    const httpId = location.href.match(new RegExp(/groups\/(\d+)/))[1];
    $.ajax({
      url: `/groups/${httpId}/api/messages`,
      type: "get",
      dataType: "json",
      data: { id: last_message_id }
    })
      .done((messages) => {
        let insertHTML = "";
        let pageCount = 0;
        messages.forEach((newMessage) => {
          insertHTML += buildHTML(newMessage);
          pageCount = 1;
        });
        $(".messages").append(insertHTML);
        if (pageCount === 1) {
          $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight });
          pageCount = 0;
        }
      })
      .fail(() => {
        alert("error");
      });
  };
  const limitedPageLoad = () => {
    const url = location.href;
    if (url.match(/groups\/\d+\/messages/)) {
      reloadMessages();
    }
  }
  setInterval(limitedPageLoad, 10000);
});
