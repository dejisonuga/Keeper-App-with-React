import React, { useState } from "react";

function Note({ title, content, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  function handleSave(event) {
    event.preventDefault();
    onUpdate(editedContent);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditedContent(content);
    setIsEditing(false);
  }

  return (
    <div className="note">
      <h1>{title}</h1>
      {isEditing ? (
        <form className="note-editor" onSubmit={handleSave}>
          <textarea
            aria-label={`Edit ${title}`}
            value={editedContent}
            onChange={(event) => setEditedContent(event.target.value)}
          />
          <div className="note-actions">
            <button
              type="submit"
              className="icon-button"
              aria-label={`Save changes to ${title}`}
              title="Save"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m5 12 4 4L19 6" />
              </svg>
            </button>
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p>{content}</p>
          <div className="note-actions">
            <button
              type="button"
              className="icon-button"
              aria-label={`Edit ${title}`}
              title="Edit"
              onClick={() => setIsEditing(true)}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m14 5 5 5M4 20l4.5-1 10-10a2.1 2.1 0 0 0-3-3l-10 10L4 20Z" />
              </svg>
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label={`Delete ${title}`}
              title="Delete"
              onClick={onDelete}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Note;
