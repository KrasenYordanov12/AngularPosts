import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../core/models/post';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-home-component',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    public posts: Post[];
    public post: Post = new Post();
    public showForm = false;
    private lastId = 10;

    constructor(private http: HttpClient) {
        this.http.get('https://jsonplaceholder.typicode.com/posts')
        .toPromise()
        .then((a: Post[]) => {
            this.posts = a;
        });
    }

    addPost() {
      this.post.id = ++this.lastId;
      this.posts.push(this.post);
      // send data to server
      this.post = new Post();
      this.showForm = false;
    }

    deletePost(index: number) {
        const swalSettings = {
            title: 'Сигурни ли сте, че искате да изтриете поста?',
           // text: 'You won\'t be able to revert this!',
            type: 'warning',
            showCancelButton: true,
        };
        // @ts-ignore
        Swal.fire(swalSettings).then(r => {
            if (r.value) {
                this.http.delete('https://jsonplaceholder.typicode.com/posts/1')
                .toPromise()
                .then(r => {
                    this.posts.splice(index, 1);
                });
            }
        });



      // this.http.delete
    }
}
