import sublime
import sublime_plugin
import markdown_python
import os
import tempfile
import webbrowser

#TODO: option to generate html using the same name as the markdown file
#TODO: option to use or not using css
#TODO: option to embedded the css into the file or using external file
#TODO: option to set charset
#TODO: Some way to make html prettier?
class MarkdownBuild(sublime_plugin.WindowCommand):
    def run(self):
        s = sublime.load_settings("MarkdownBuild.sublime-settings")
        output_html = s.get("output_html", False)
        view = self.window.active_view()
        if not view:
            return
        file_name = view.file_name()
        if not file_name:
            return
        contents = view.substr(sublime.Region(0, view.size()))
        md = markdown_python.markdown(contents)
        html = '<html><meta charset="UTF-8">'
        css = os.path.join(sublime.packages_path(), 'MarkdownBuild', 'markdown.css')
        if (os.path.isfile(css)):
            styles = open(css, 'r').read()
            html += '<style>' + styles + '</style>'
        html += "<body>"
        html += md
        html += "</body></html>"

        if output_html:
            html_name = os.path.splitext(file_name)[0]
            html_name = html_name + ".html"
            output = open(html_name, 'w')
        else:
            output = tempfile.NamedTemporaryFile(delete=False, suffix='.html')

        output.write(html.encode('UTF-8'))
        output.close()
        webbrowser.open("file://" + output.name)
