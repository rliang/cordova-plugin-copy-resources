# cordova-plugin-copy-resources

Cordova/Phonegap plugin to copy resources at build time.

Will not overwrite existing files, one must manually remove destination files
in order to update them.

## Example config.xml

```xml
<resource dest="www/lib">
  <resource src="bower_components">
  <resource src="node_modules">
    <resource src="whole_directory" />
    <resource src="only_some_files/dist/*.min.js" />
    <resource dest="with_another_filename" src="original_file" />
  </resource>
</resource>
<resource dest="../copy_to_outside" src="what_am_i_even_doing" />
```
