use std::path::PathBuf;
use chrono::Local;

#[tauri::command]
pub fn filepath_available(in_dir: String) -> Option<PathBuf> {
  Some(try_filename_in_path(&PathBuf::from(in_dir)))
}

fn try_filename_in_path(target_path: &PathBuf) -> PathBuf {
  let dt = Local::now();
  let file_name_prefix = dt.format("%Y-%m-%d").to_string();
  let new_file_name = file_name_prefix.to_string() + ".md";
  let new_file_path = target_path.join(new_file_name);

  if new_file_path.exists() {
    let mut counter = 1;
    let mut retrying = false;
    let mut found_path = new_file_path;

    while retrying == false {
      let try_new_file_name = format!(
        "{} ({}).md",
        file_name_prefix.to_string(),
        counter.to_string()
      );
      let try_new_file_path = target_path.join(&try_new_file_name);

      if try_new_file_path.exists() == false {
        retrying = true;
        found_path = try_new_file_path
      } else {
        counter += 1;
      }
    }

    found_path
  } else {
    new_file_path
  }
}
