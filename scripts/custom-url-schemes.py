import os
import plistlib

def find_url_schemes(app_paths):
    schemes = {}
    
    for app_path in app_paths:
        plist_path = os.path.join(app_path, "Contents", "Info.plist")
        
        if os.path.exists(plist_path):
            try:
                with open(plist_path, "rb") as f:
                    plist_data = plistlib.load(f)
                    url_types = plist_data.get("CFBundleURLTypes", [])
                    for url_type in url_types:
                        scheme_list = url_type.get("CFBundleURLSchemes", [])
                        for scheme in scheme_list:
                            schemes[scheme] = app_path
            except Exception as e:
                print(f"Error reading plist for {app_path}: {e}")
    
    return schemes

def get_app_paths(base_dirs):
    app_paths = []
    
    for base_dir in base_dirs:
        for root, dirs, files in os.walk(base_dir):
            for dir_name in dirs:
                if dir_name.endswith(".app"):
                    app_paths.append(os.path.join(root, dir_name))
    
    return app_paths

if __name__ == "__main__":
    base_dirs = ["/Applications", "/System/Applications", "/Users/Shared/Applications", os.path.expanduser("~/Applications")]
    print("Scanning for apps...")
    app_paths = get_app_paths(base_dirs)
    print(f"Found {len(app_paths)} applications. Extracting URL schemes...")
    
    url_schemes = find_url_schemes(app_paths)
    if url_schemes:
        print("\nCustom URL Schemes Found:")
        for scheme, app_path in url_schemes.items():
            print(f"{scheme}: {app_path}")
    else:
        print("No custom URL schemes found.")